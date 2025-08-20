import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const IntroOverlay: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const seen = sessionStorage.getItem('introSeen');
    if (seen || prefersReduced) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem('introSeen', '1');
      setVisible(false);
    }, 1800);
    return () => clearTimeout(t);
  }, [prefersReduced]);

  if (!visible) return null;

  return (
    <motion.div className="fixed inset-0 z-[100] bg-gray-950">
      {/* Curtain wipe */}
      <motion.div
        className="absolute inset-0 origin-left bg-gray-900"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      />

      {/* Center content */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="relative text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6"
          >
            <img src="/images/brand/brand-mark.svg" alt="Brand" className="h-16 w-16 mx-auto" />
          </motion.div>

          <motion.h1
            className="text-white text-2xl md:text-4xl font-extrabold tracking-tight"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
          >
            Engineering • Mechatronics • Simulation
          </motion.h1>

          {/* Animated engineering traces */}
          <motion.svg
            width="640"
            height="200"
            viewBox="0 0 640 200"
            className="mt-10 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <defs>
              <linearGradient id="glow" x1="0" x2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            {[
              'M20 60 H220 q20 0 30 20 L280 140 H620',
              'M20 100 H160 q20 0 30 20 L220 160 H620',
              'M20 140 H260 q20 0 30 -20 L320 80 H620',
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="url(#glow)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.1 * i, ease: 'easeInOut' }}
              />
            ))}
          </motion.svg>
        </div>

        {/* Auto-complete after timing */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.7 }}
          onAnimationComplete={() => setVisible(false)}
        />
      </div>
    </motion.div>
  );
};

export default IntroOverlay;
