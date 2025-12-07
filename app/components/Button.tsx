import Link from 'next/link';

type ButtonProps = {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0';

  const variants = {
    primary:
      'bg-gradient-cta text-white shadow-medium hover:shadow-glow focus-visible:ring-primary-500',
    secondary:
      'bg-gradient-playful text-white shadow-medium hover:shadow-glow-orange focus-visible:ring-secondary-500',
    ghost:
      'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  );
}
