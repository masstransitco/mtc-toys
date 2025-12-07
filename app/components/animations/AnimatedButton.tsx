'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';
import { buttonHover, transitions } from '@/lib/animations';

type Variant = 'primary' | 'secondary' | 'ghost' | 'playful';

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-gradient-cta text-white shadow-medium hover:shadow-glow',
  secondary: 'bg-gradient-playful text-white shadow-medium hover:shadow-glow-orange',
  ghost: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
  playful: 'bg-secondary-500 text-white hover:bg-secondary-600 shadow-medium',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: AnimatedButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-colors duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.div
        initial="rest"
        whileHover={disabled ? 'rest' : 'hover'}
        whileTap={disabled ? 'rest' : 'tap'}
        variants={buttonHover}
      >
        <Link href={href} className={combinedStyles}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial="rest"
      whileHover={disabled ? 'rest' : 'hover'}
      whileTap={disabled ? 'rest' : 'tap'}
      variants={buttonHover}
      className={combinedStyles}
    >
      {children}
    </motion.button>
  );
}

// Icon button variant
interface AnimatedIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel: string;
}

export function AnimatedIconButton({
  children,
  onClick,
  className = '',
  ariaLabel,
}: AnimatedIconButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={ariaLabel}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonHover}
      className={`
        p-2 rounded-full
        bg-surface hover:bg-primary-100
        text-slate-600 hover:text-primary-600
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

// CTA button with arrow animation
interface AnimatedCTAButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function AnimatedCTAButton({
  children,
  href,
  className = '',
}: AnimatedCTAButtonProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonHover}
    >
      <Link
        href={href}
        className={`
          inline-flex items-center gap-2
          px-8 py-4 text-lg font-bold
          bg-gradient-cta text-white
          rounded-2xl shadow-large
          hover:shadow-glow
          transition-shadow duration-300
          ${className}
        `}
      >
        {children}
        <motion.span
          variants={{
            rest: { x: 0 },
            hover: { x: 4, transition: transitions.spring },
          }}
        >
          &rarr;
        </motion.span>
      </Link>
    </motion.div>
  );
}
