'use client';
import { useState } from 'react';
import { CreditsModal } from './credits-modal';

const CC_BY = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        aria-label="Design credits: “portfolio cyberpunk – dev” — CC BY 4.0. Full details."
        title="Design credits · CC BY 4.0"
        className="text-[14px] font-rajdhani px-1.5 py-0.5 rounded-full border border-white/50 text-white hover:bg-white/10 absolute left-4 bottom-4 z-50 max-[992px]:bottom-3 max-[992px]:left-1/2 max-[992px]:-translate-x-1/2"
      >
        CC&nbsp;BY
      </button>
      <CreditsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CC_BY;
