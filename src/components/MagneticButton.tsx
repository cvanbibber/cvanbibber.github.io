import React, { useRef } from 'react';
import { useReducedMotion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // px offset strength
};

/**
 * MagneticButton: button subtly follows cursor within its bounds.
 */
const MagneticButton: React.FC<Props> = ({ children, className = '', strength = 16 }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  return (
    <button ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </button>
  );
};

export default MagneticButton;
