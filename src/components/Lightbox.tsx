import React, { useEffect } from 'react';
import { motion } from 'motion/react';

type LightboxProps = {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate?: (nextIndex: number) => void;
};

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onNavigate }) => {
  const current = images[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (onNavigate) {
        if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
        if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, images.length, onClose, onNavigate]);

  return (
    <motion.div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0" onClick={onClose} />
      <motion.img
        src={current}
        alt="Preview"
        className="relative max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      {onNavigate && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 text-white/80 select-none">
          <button onClick={() => onNavigate((index - 1 + images.length) % images.length)} className="text-3xl">‹</button>
          <button onClick={() => onNavigate((index + 1) % images.length)} className="text-3xl">›</button>
        </div>
      )}
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 text-2xl">✕</button>
    </motion.div>
  );
};

export default Lightbox;
