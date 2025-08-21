import React, { useRef } from 'react';
import { useReducedMotion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number; // maximum tilt in degrees
  scale?: number; // hover scale
};

/**
 * TiltCard: subtle 3D tilt on mouse move with reduced-motion respect.
 */
const TiltCard: React.FC<Props> = ({ children, className = '', maxTiltDeg = 8, scale = 1.02 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduce) return; // respect reduced motion
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (py - 0.5) * (maxTiltDeg * 2); // invert for natural tilt
    const ry = (0.5 - px) * (maxTiltDeg * 2);
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={ref}
      className={`[transform-style:preserve-3d] transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      // small initial transform for GPU hint
      style={{ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)' }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
