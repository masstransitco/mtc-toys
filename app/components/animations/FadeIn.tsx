'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeInUp, fadeInDown, fadeIn, slideInLeft, slideInRight, transitions } from '@/lib/animations';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const variants = {
  up: fadeInUp,
  down: fadeInDown,
  left: slideInLeft,
  right: slideInRight,
  none: fadeIn,
};

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  amount = 0.3,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const variant = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variant}
      transition={{
        duration,
        delay,
        ease: transitions.slow.ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrapper for immediate fade in (no scroll trigger)
interface FadeInImmediateProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeInImmediate({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
}: FadeInImmediateProps) {
  const variant = variants[direction];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variant}
      transition={{
        duration,
        delay,
        ease: transitions.slow.ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
