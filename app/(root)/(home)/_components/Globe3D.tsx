'use client';
import { useEffect, useRef } from 'react';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Material,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import land from './earth-land.json';

// Keep the first two v2.2 orbit colors; recolor only the third cyan node.
const satelliteColors = ['#F75049', '#5EF6FF', '#F8EF00'] as const;

export default function Globe3D({
  active,
  onReady,
  onFailure,
}: {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    control = useRef<{ setActive: (value: boolean) => void } | null>(null);
  useEffect(() => {
    const node = canvas.current;
    if (!node) return;
    const context = node.getContext('webgl2', {
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!context) {
      onFailure();
      return;
    }
    const geometries = new Set<BufferGeometry>(),
      materials = new Set<Material>();
    let renderer: WebGLRenderer | undefined,
      frame = 0,
      running = false,
      last = 0,
      time = 0,
      hovered = false,
      speed = 1,
      frames = 0;
    const dispose = () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer?.dispose();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      running = false;
      cancelAnimationFrame(frame);
      onFailure();
    };
    node.addEventListener('webglcontextlost', lost, true);
    try {
      renderer = new WebGLRenderer({
        canvas: node,
        context,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.outputColorSpace = SRGBColorSpace;
      renderer.setClearColor(0x02070b, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth <= 600 ? 1 : 1.5));
      const scene = new Scene(),
        camera = new PerspectiveCamera(40, 1, 0.1, 20);
      camera.position.z = 3.9;
      const planet = new Group();
      planet.rotation.z = 0.28;
      planet.rotation.y = (-70 * Math.PI) / 180;
      scene.add(planet);
      const geometry = (g: BufferGeometry) => {
        geometries.add(g);
        return g;
      };
      const material = <T extends Material>(m: T) => {
        materials.add(m);
        return m;
      };
      planet.add(
        new Mesh(
          geometry(new SphereGeometry(0.982, 32, 20)),
          material(
            new ShaderMaterial({
              vertexShader: `varying vec3 vNormal; varying vec3 vView;
              void main(){vec4 pos=modelViewMatrix*vec4(position,1.0);vView=-pos.xyz;
              vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*pos;}`,
              fragmentShader: `varying vec3 vNormal; varying vec3 vView;
              void main(){float rim=pow(1.0-max(0.0,dot(normalize(vNormal),normalize(vView))),3.2);
              gl_FragColor=vec4(mix(vec3(.008,.033,.043),vec3(.055,.29,.33),rim*.8),1.0);}`,
            }),
          ),
        ),
      );
      // Natural Earth public-domain land samples, generated once outside the runtime.
      const position = (lon: number, lat: number, radius = 1.006) => {
        const a = (lon * Math.PI) / 180,
          b = (lat * Math.PI) / 180;
        return [
          radius * Math.cos(b) * Math.cos(a),
          radius * Math.sin(b),
          radius * Math.cos(b) * Math.sin(a),
        ];
      };
      const points = land.points.flatMap(([lon, lat]) => position(lon, lat));
      planet.add(
        new Points(
          geometry(
            new BufferGeometry().setAttribute('position', new Float32BufferAttribute(points, 3)),
          ),
          material(
            new PointsMaterial({
              color: 0x5ef6ff,
              size: 0.026,
              sizeAttenuation: true,
              transparent: true,
              opacity: 0.95,
            }),
          ),
        ),
      );
      const coast: number[] = [];
      for (const ring of land.coasts)
        for (let i = 1; i < ring.length; i++) {
          if (Math.abs(ring[i][0] - ring[i - 1][0]) > 180) continue;
          coast.push(
            ...position(ring[i - 1][0], ring[i - 1][1], 1.01),
            ...position(ring[i][0], ring[i][1], 1.01),
          );
        }
      planet.add(
        new LineSegments(
          geometry(
            new BufferGeometry().setAttribute('position', new Float32BufferAttribute(coast, 3)),
          ),
          material(new LineBasicMaterial({ color: 0x5ef6ff, transparent: true, opacity: 0.48 })),
        ),
      );
      const segments: number[] = [];
      const p = (lat: number, lon: number) => [
        1.012 * Math.cos(lat) * Math.cos(lon),
        1.012 * Math.sin(lat),
        1.012 * Math.cos(lat) * Math.sin(lon),
      ];
      for (let l = -60; l <= 60; l += 20)
        for (let i = 0; i < 72; i++)
          segments.push(
            ...p((l * Math.PI) / 180, (i * 2 * Math.PI) / 72),
            ...p((l * Math.PI) / 180, ((i + 1) * 2 * Math.PI) / 72),
          );
      for (let l = 0; l < 180; l += 20)
        for (let i = 0; i < 72; i++)
          segments.push(
            ...p((i * 2 * Math.PI) / 72, (l * Math.PI) / 180),
            ...p(((i + 1) * 2 * Math.PI) / 72, (l * Math.PI) / 180),
          );
      planet.add(
        new LineSegments(
          geometry(
            new BufferGeometry().setAttribute('position', new Float32BufferAttribute(segments, 3)),
          ),
          material(new LineBasicMaterial({ color: 0x5ef6ff, transparent: true, opacity: 0.2 })),
        ),
      );
      const orbitGroups: Group[] = [],
        satellites: Mesh[] = [];
      for (let n = 0; n < 3; n++) {
        const group = new Group();
        group.rotation.x = [0.4, 1.1, 0.85][n];
        group.rotation.z = [0.6, -0.5, 1.4][n];
        scene.add(group);
        orbitGroups.push(group);
        const vertices: number[] = [];
        for (let i = 0; i < 128; i++) {
          const a = (i * 2 * Math.PI) / 128;
          vertices.push((1.22 + n * 0.025) * Math.cos(a), (1.22 + n * 0.025) * Math.sin(a), 0);
        }
        group.add(
          new LineLoop(
            geometry(
              new BufferGeometry().setAttribute(
                'position',
                new Float32BufferAttribute(vertices, 3),
              ),
            ),
            material(
              new LineBasicMaterial({
                color: 0x5ef6ff,
                transparent: true,
                opacity: n === 2 ? 0.15 : 0.4,
              }),
            ),
          ),
        );
        const satellite = new Mesh(
          geometry(new SphereGeometry(n === 2 ? 0.018 : 0.028, 10, 8)),
          material(new MeshBasicMaterial({ color: new Color(satelliteColors[n]) })),
        );
        group.add(satellite);
        satellites.push(satellite);
      }
      const size = () => {
        if (!renderer) return;
        const r = node.getBoundingClientRect();
        if (r.width && r.height) {
          renderer.setSize(r.width, r.height, false);
          camera.aspect = r.width / r.height;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        }
      };
      const resize = new ResizeObserver(size);
      resize.observe(node);
      size();
      const enter = () => {
          hovered = true;
        },
        leave = () => {
          hovered = false;
        };
      node.addEventListener('pointerenter', enter);
      node.addEventListener('pointerleave', leave);
      const render = (stamp: number) => {
        if (!running || !renderer) return;
        const delta = last ? Math.min(0.05, (stamp - last) / 1000) : 0;
        last = stamp;
        time += delta;
        speed += (hovered ? 1.25 - speed : 1 - speed) * Math.min(1, delta * 3);
        planet.rotation.y += delta * ((2 * Math.PI) / 18) * speed;
        planet.rotation.x = Math.sin(time * 0.16) * 0.045;
        planet.rotation.z = 0.28 + Math.sin(time * 0.12) * 0.025;
        satellites.forEach((satellite, n) => {
          const a = (time * 2 * Math.PI) / [9, 13, 17][n];
          const radius = 1.22 + n * 0.025;
          satellite.position.set(radius * Math.cos(a), radius * Math.sin(a), 0);
          orbitGroups[n].rotation.y = Math.sin(time * 0.12 + n) * 0.15;
        });
        renderer.render(scene, camera);
        frames++;
        if (frames % 20 === 0) {
          node.dataset.yaw = planet.rotation.y.toFixed(4);
          node.dataset.frames = String(frames);
        }
        frame = requestAnimationFrame(render);
      };
      control.current = {
        setActive: (value) => {
          running = value;
          cancelAnimationFrame(frame);
          last = 0;
          if (value) frame = requestAnimationFrame(render);
        },
      };
      onReady();
      node.dataset.satelliteColors = satellites
        .map((s) => '#' + (s.material as MeshBasicMaterial).color.getHexString())
        .join(',');
      return () => {
        running = false;
        cancelAnimationFrame(frame);
        resize.disconnect();
        node.removeEventListener('pointerenter', enter);
        node.removeEventListener('pointerleave', leave);
        node.removeEventListener('webglcontextlost', lost, true);
        control.current = null;
        dispose();
        if (!context.isContextLost()) renderer?.forceContextLoss();
      };
    } catch {
      node.removeEventListener('webglcontextlost', lost, true);
      dispose();
      onFailure();
    }
  }, [onReady, onFailure]);
  useEffect(() => {
    control.current?.setActive(active);
    return () => control.current?.setActive(false);
  }, [active]);
  return (
    <canvas
      ref={canvas}
      className="personal-terminal__three-canvas"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
