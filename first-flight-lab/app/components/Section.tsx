type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: 'white' | 'soft';
};

export function Section({
  id,
  className = '',
  children,
  background = 'white',
}: SectionProps) {
  const bgStyles = background === 'soft' ? 'bg-gray-50' : 'bg-white';

  return (
    <section id={id} className={`py-16 sm:py-20 ${bgStyles} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
