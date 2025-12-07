'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover, imageZoom, transitions } from '@/lib/animations';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className = '',
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Image container with zoom effect
interface AnimatedImageContainerProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedImageContainer({
  children,
  className = '',
}: AnimatedImageContainerProps) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="rest"
      whileHover="hover"
    >
      <motion.div variants={imageZoom}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// Product card with full animation
interface ProductCardAnimatedProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function ProductCardAnimated({
  children,
  className = '',
}: ProductCardAnimatedProps) {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className={`group rounded-2xl bg-white border border-gray-100 overflow-hidden ${className}`}
    >
      {children}
    </motion.article>
  );
}

// Feature card with icon bounce
interface FeatureCardAnimatedProps {
  children: ReactNode;
  className?: string;
}

export function FeatureCardAnimated({
  children,
  className = '',
}: FeatureCardAnimatedProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={{
        rest: {
          scale: 1,
          backgroundColor: 'rgb(240 249 255)', // surface color
        },
        hover: {
          scale: 1.02,
          backgroundColor: 'rgb(224 242 254)', // primary-100
          transition: transitions.spring,
        },
      }}
      className={`rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
