type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: 'white' | 'soft' | 'warm' | 'gradient' | 'dark';
};

const bgStyles = {
  white: 'bg-white',
  soft: 'bg-surface',
  warm: 'bg-surface-warm',
  gradient: 'bg-gradient-sky',
  dark: 'bg-slate-900',
};

export function Section({
  id,
  className = '',
  children,
  background = 'white',
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${bgStyles[background]} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  light = false,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl sm:text-4xl font-display font-bold ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg max-w-2xl mx-auto ${light ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
      )}
    </div>
  );
}
