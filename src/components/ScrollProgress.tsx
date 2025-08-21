import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/**
 * ScrollProgress: a thin progress bar at the very top indicating page scroll.
 */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 h-1 origin-left z-[100] bg-gradient-to-r from-primary-500 via-accent-500 to-primary-700"
    />
  );
};

export default ScrollProgress;
