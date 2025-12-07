'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { staggerContainer, staggerContainerFast, staggerContainerSlow, fadeInUp, transitions } from '@/lib/animations';

type Speed = 'fast' | 'normal' | 'slow';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  speed?: Speed;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'ul' | 'ol' | 'section';
}

const containerVariants = {
  fast: staggerContainerFast,
  normal: staggerContainer,
  slow: staggerContainerSlow,
};

export function StaggerContainer({
  children,
  className = '',
  speed = 'normal',
  once = true,
  amount = 0.2,
  as = 'div',
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const variant = containerVariants[speed];

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variant}
      className={className}
    >
      {children}
    </Component>
  );
}

// Child item for stagger animation
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

export function StaggerItem({
  children,
  className = '',
  as = 'div',
}: StaggerItemProps) {
  const Component = motion[as];

  return (
    <Component
      variants={fadeInUp}
      transition={transitions.smooth}
      className={className}
    >
      {children}
    </Component>
  );
}

// Grid variant for product cards
interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  speed?: Speed;
  once?: boolean;
}

export function StaggerGrid({
  children,
  className = '',
  speed = 'normal',
  once = true,
}: StaggerGridProps) {
  return (
    <StaggerContainer
      className={`grid ${className}`}
      speed={speed}
      once={once}
      amount={0.1}
    >
      {children}
    </StaggerContainer>
  );
}
