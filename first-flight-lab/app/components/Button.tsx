import Link from 'next/link';

type ButtonProps = {
  href: string;
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = 'primary',
  children,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    ghost:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400',
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
