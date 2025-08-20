import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Animated engineering-themed background for the Home hero
// - Parallax Y motion on scroll
// - Flowing traces via dashoffset animation
const HeroBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [0.35, 0.12]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient to add subtle color */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 to-accent-50/40" />

      {/* Flowing PCB traces */}
      <motion.svg
        style={{ y, opacity }}
        className="absolute -left-10 -top-8 w-[130%] h-auto"
        viewBox="0 0 1440 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {[ 
          'M40 120 H260 q24 0 36 24 L320 200 H1400',
          'M80 200 H280 q24 0 36 -24 L340 140 H1400',
          'M60 160 H240 q24 0 36 24 L300 220 H1400',
          'M120 260 H340 q24 0 36 -24 L400 200 H1400',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#heroGlow)"
            strokeOpacity={0.9}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.25))' }}
            initial={{ pathLength: 0, pathOffset: 0.2 }}
            animate={{ pathLength: 1, pathOffset: 0 }}
            transition={{ duration: 1.2 + i * 0.15, ease: 'easeInOut' }}
          />
        ))}

        {/* Subtle dashed paths flowing to suggest motion */}
        {[ 
          'M20 320 H220 q20 0 30 20 L280 380 H1380',
          'M100 360 H300 q20 0 30 -20 L360 320 H1380',
        ].map((d, i) => (
          <motion.path
            key={`dash-${i}`}
            d={d}
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="8 10"
            fill="none"
            initial={{ strokeDashoffset: 40 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
          />
        ))}
      </motion.svg>

      {/* Mechanical grid overlay for texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>
    </div>
  );
};

export default HeroBackground;
