import Image from 'next/image';
import { Metadata } from 'next';
import { Section, SectionHeader, CheckIcon } from '../components';
import { safetyContent } from '../content';

export const metadata: Metadata = {
  title: 'Is RC Flying Safe for Kids? | Indoor Safety Guide',
  description: 'Learn how First Flight Lab foam RC jets are designed for safe indoor flying. Age recommendations, supervision tips, and house rules for kids ages 5+. ASTM F963 tested.',
  keywords: ['is RC flying safe for kids', 'indoor RC plane safety', 'safe RC toys for children', 'beginner RC plane age', 'foam RC plane safety'],
  openGraph: {
    title: 'RC Plane Safety for Kids | First Flight Lab',
    description: 'Indoor-safe foam design, age 5+ recommendations, and house rules for safe flying at home.',
    images: ['/hand-take-off.png'],
  },
};

function SafetyHero() {
  return (
    <section className="bg-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">
          {safetyContent.heading}
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about flying safely with First Flight Lab at home.
        </p>
      </div>
    </section>
  );
}

function SafetySection({ section }: { section: typeof safetyContent.sections[0] }) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100">
      <h3 className="text-xl font-medium text-gray-900 mb-4">{section.title}</h3>
      {'content' in section && section.content && (
        <p className="text-gray-600 leading-relaxed">{section.content}</p>
      )}
      {'bullets' in section && section.bullets && (
        <ul className="space-y-3 mt-2">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SafetySections() {
  return (
    <Section background="soft">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2 text-center mb-8">
          <Image
            src="/hand-take-off.png"
            alt="Safe palm launch - plane takes off gently from your hand"
            width={600}
            height={400}
            className="w-full max-w-xl mx-auto h-auto rounded-lg shadow-md"
          />
          <p className="mt-3 text-sm text-gray-600 font-medium">
            Safe palm launch – no runways needed
          </p>
        </div>
        {safetyContent.sections.map((section) => (
          <SafetySection key={section.title} section={section} />
        ))}
      </div>
    </Section>
  );
}

function SafetyNote() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Questions about safety?
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;re here to help. Reach out if you have any concerns about flying safely at home.
        </p>
        <a
          href="mailto:safety@firstflightlab.com"
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          safety@firstflightlab.com
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </Section>
  );
}

export default function SafetyPage() {
  return (
    <>
      <SafetyHero />
      <SafetySections />
      <SafetyNote />
    </>
  );
}
