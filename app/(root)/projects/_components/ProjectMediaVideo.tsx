import { useEffect, useRef } from 'react';

const DECODE_STALL_TIMEOUT_MS = 8000;
const MIN_PLAYHEAD_PROGRESS_SECONDS = 0.1;

export default function ProjectMediaVideo({
  src,
  poster,
  onFailure,
}: {
  src: string;
  poster: string;
  onFailure: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const failure = useRef(onFailure);
  failure.current = onFailure;
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    let disposed = false;
    let visible = false;
    let lastMediaTime: number | undefined;
    let lastProgressTime = node.currentTime;
    let lastFrameAt = performance.now();
    let legacyFrames = 0;
    let frameRequest: number | undefined;
    let playbackBlocked = false;
    let failed = false;
    let stallTimer: number | undefined;
    const frameCallbacksSupported = typeof node.requestVideoFrameCallback === 'function';
    const frameQualitySupported = typeof node.getVideoPlaybackQuality === 'function';
    const cancelStallCheck = () => {
      window.clearTimeout(stallTimer);
      stallTimer = undefined;
    };
    const fail = () => {
      if (disposed || failed) return;
      failed = true;
      cancelStallCheck();
      failure.current();
    };
    const expectsPlaybackWhileIdle = () =>
      !playbackBlocked &&
      visible &&
      !document.hidden &&
      !node.paused &&
      node.networkState === node.NETWORK_IDLE;
    const observeLegacyProgress = () => {
      if (!frameCallbacksSupported && frameQualitySupported) {
        const quality = node.getVideoPlaybackQuality();
        const frames = quality.totalVideoFrames - quality.droppedVideoFrames;
        if (
          frames !== legacyFrames &&
          Math.abs(node.currentTime - lastProgressTime) >= MIN_PLAYHEAD_PROGRESS_SECONDS
        ) {
          legacyFrames = frames;
          lastProgressTime = node.currentTime;
          lastFrameAt = performance.now();
        }
      }
    };
    const onStallDeadline = (): void => {
      stallTimer = undefined;
      if (disposed || failed || !expectsPlaybackWhileIdle()) return;
      observeLegacyProgress();
      const remaining = DECODE_STALL_TIMEOUT_MS - (performance.now() - lastFrameAt);
      if (remaining <= 0) fail();
      else stallTimer = window.setTimeout(onStallDeadline, remaining);
    };
    const checkDecodeStall = () => {
      observeLegacyProgress();
      if (!expectsPlaybackWhileIdle()) cancelStallCheck();
      else if (
        stallTimer === undefined &&
        !disposed &&
        !failed &&
        (frameCallbacksSupported || frameQualitySupported)
      ) {
        lastFrameAt = performance.now();
        stallTimer = window.setTimeout(onStallDeadline, DECODE_STALL_TIMEOUT_MS);
      }
    };
    const observeFrame: VideoFrameRequestCallback = (_, metadata) => {
      if (disposed || failed) return;
      // Corrupt streams can report presented frames while the playback clock is stuck.
      if (
        Number.isFinite(metadata.mediaTime) &&
        metadata.mediaTime !== lastMediaTime &&
        Math.abs(node.currentTime - lastProgressTime) >= MIN_PLAYHEAD_PROGRESS_SECONDS
      ) {
        lastMediaTime = metadata.mediaTime;
        lastProgressTime = node.currentTime;
        lastFrameAt = performance.now();
      }
      frameRequest = node.requestVideoFrameCallback(observeFrame);
    };
    if (frameCallbacksSupported) frameRequest = node.requestVideoFrameCallback(observeFrame);
    const sync = () => {
      if (document.hidden) node.pause();
      else {
        playbackBlocked = false;
        void node.play().catch((error: unknown) => {
          // Unsupported playback can reject without emitting a media error.
          // Abort/autoplay-policy rejections are not decoder failures.
          if (disposed || !(error instanceof DOMException)) return;
          if (error.name === 'NotSupportedError') fail();
          else if (error.name === 'NotAllowedError') {
            playbackBlocked = true;
            cancelStallCheck();
          }
        });
      }
      checkDecodeStall();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      checkDecodeStall();
    });
    observer.observe(node);
    const events = [
      'loadeddata',
      'loadedmetadata',
      'canplay',
      'playing',
      'progress',
      'suspend',
      'stalled',
      'waiting',
      'pause',
      'timeupdate',
    ];
    for (const event of events) node.addEventListener(event, checkDecodeStall);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      disposed = true;
      cancelStallCheck();
      if (frameRequest !== undefined) node.cancelVideoFrameCallback(frameRequest);
      observer.disconnect();
      for (const event of events) node.removeEventListener(event, checkDecodeStall);
      document.removeEventListener('visibilitychange', sync);
      node.pause();
    };
  }, [src]);
  return (
    <video
      ref={video}
      className="projects-deck__media-video"
      src={src}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onError={onFailure}
    />
  );
}
