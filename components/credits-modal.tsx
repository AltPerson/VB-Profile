// components/CreditsModal.tsx
'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CreditsContent } from './credits-content';

export function CreditsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastActive.current = document.activeElement as HTMLElement;
      dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      lastActive.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="credits-title"
        className="fixed inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[min(92vw,720px)]
                   rounded-2xl border border-white/10 bg-black/80 p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 id="credits-title" className="text-lg font-tomorrow text-white">
            Design credits
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="rounded px-2 py-1 text-sm text-gray-300 hover:text-white
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Close credits"
          >
            ✕
          </button>
        </div>
        <CreditsContent />
      </div>
    </div>,
    document.body,
  );
}
