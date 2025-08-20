import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const EngineeringBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -40]);
  const y2 = useTransform(scrollY, [0, 600], [0, -20]);
  const opacity = useTransform(scrollY, [0, 400], [0.2, 0.05]);

  return (
    <div className="pointer-events-none select-none fixed inset-0 -z-10 overflow-hidden">
      {/* PCB traces layer */}
      <motion.svg
        style={{ y: y1, opacity }}
        className="absolute -top-16 left-0 w-[140%] max-w-none"
        viewBox="0 0 1440 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5" strokeWidth="1.5" strokeLinecap="round">
          <path d="M20 120 H240 q20 0 30 20 L300 200 H1420" stroke="#60a5fa" />
          <path d="M60 200 H280 q20 0 30 -20 L340 140 H1420" stroke="#22c55e" />
          <path d="M40 160 H220 q20 0 30 20 L280 220 H1420" stroke="#a78bfa" />
        </g>
      </motion.svg>

      {/* Mechanical grid layer */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>
    </div>
  );
};

export default EngineeringBackground;
