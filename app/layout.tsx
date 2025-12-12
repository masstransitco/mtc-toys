import type { Metadata } from 'next';
import { Nunito, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig, navigation, footer } from './content';
import Link from 'next/link';
import { CartProvider } from './context/CartContext';
import { createClient } from '@/lib/supabase/server';
import { HeaderClient } from './components/HeaderClient';
import { Logo } from './components/Logo';
import { LayoutWrapper } from './components/LayoutWrapper';
import { FacebookPixel } from './components/analytics/FacebookPixel';
import { GoogleAnalytics } from './components/analytics/GoogleAnalytics';
import { generateOrganizationSchema, generateWebsiteSchema, generateFAQSchema } from '@/lib/structured-data';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.firstflightlab.com'),
  title: {
    default: 'First Flight Lab | Indoor RC Planes for Kids Ages 5+',
    template: `%s | ${siteConfig.name}`,
  },
  description: 'The best indoor RC plane for kids. Beginner-friendly foam jets with easy controls, designed for living room flying. Safe, crash-resistant, ages 5+. Free shipping over $100.',
  keywords: ['indoor RC plane for kids', 'beginner RC airplane', 'foam RC jet', 'kids remote control plane', 'RC plane for 5 year olds', 'safe indoor flying toy', 'first RC plane for children'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.firstflightlab.com',
    siteName: siteConfig.name,
    title: 'First Flight Lab | Indoor RC Planes for Kids Ages 5+',
    description: 'The best indoor RC plane for kids. Beginner-friendly foam jets designed for living room flying. Safe, crash-resistant, ages 5+.',
    images: [{
      url: '/logo-og-social.jpg',
      width: 1200,
      height: 630,
      alt: 'First Flight Lab - Indoor RC Planes for Kids',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Flight Lab | Indoor RC Planes for Kids Ages 5+',
    description: 'The best indoor RC plane for kids. Beginner-friendly foam jets designed for living room flying.',
    images: ['/logo-og-social.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.firstflightlab.com',
  },
};

async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 glass border-b border-primary-100/50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-display font-bold text-slate-900 hover:text-primary-600 transition-colors"
          >
            <Logo className="w-8 h-8" />
            <span className="shimmer-text">{siteConfig.name}</span>
          </Link>

          <div className="flex items-center gap-6">
            <ul className="hidden sm:flex items-center gap-6">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <HeaderClient user={user ? { email: user.email || '' } : null} />
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-primary-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-display font-bold text-slate-900">
              <Logo className="w-6 h-6" />
              {siteConfig.name}
            </Link>
            <nav>
              <ul className="flex items-center gap-6">
                {navigation.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-primary-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-slate-500">{footer.copyright}</p>
            <p className="text-xs text-slate-400 mt-1">{footer.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateOrganizationSchema(),
              generateWebsiteSchema(),
              generateFAQSchema(),
            ]),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <FacebookPixel />
        <GoogleAnalytics />
        <CartProvider>
          <LayoutWrapper header={<Header />} footer={<Footer />}>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
