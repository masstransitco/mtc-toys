// Animation variants and constants for Framer Motion

export const transitions = {
  spring: { type: "spring", stiffness: 300, damping: 30 },
  springBouncy: { type: "spring", stiffness: 400, damping: 25 },
  smooth: { duration: 0.3, ease: "easeOut" },
  smoothSlow: { duration: 0.5, ease: "easeOut" },
  slow: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  bounceIn: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] },
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const,
    }
  },
};

// Card hover animation
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.06)",
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.08)",
    transition: transitions.spring,
  },
};

// Button hover animation
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Image zoom on hover
export const imageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// Float animation for hero elements
export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

// Bounce entrance
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: transitions.bounceIn,
  },
};
