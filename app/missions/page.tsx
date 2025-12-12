import Image from 'next/image';
import { Metadata } from 'next';
import { Section, SectionHeader, CheckIcon } from '../components';
import { missionsContent } from '../content';

export const metadata: Metadata = {
  title: 'RC Plane Mission Cards for Kids | Flying Activities & Games',
  description: 'Fun mission cards turn indoor RC flying into guided activities for kids. Progressive challenges from first takeoffs to rescue runs. Perfect parent-child flying games.',
  keywords: ['RC plane activities for kids', 'flying games for children', 'RC airplane challenges', 'parent child flying activities', 'indoor RC plane games'],
  openGraph: {
    title: 'RC Plane Mission Cards for Kids | First Flight Lab',
    description: 'Turn indoor RC flying into guided adventures with mission cards. Progressive challenges perfect for kids ages 5+.',
    images: ['/mission-cards.png'],
  },
};

function MissionsHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
              {missionsContent.hero.heading}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              {missionsContent.hero.subheading}
            </p>
          </div>
          <div>
            <Image
              src="/missions-banner.png"
              alt="Foam RC jet performing a gentle turn inside a cozy living room with a dotted flight path"
              width={600}
              height={300}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionTiers() {
  const tierColors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
    { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
    { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <Section background="soft">
      <SectionHeader title="Mission tiers" subtitle="Progress from simple flights to creative challenges" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {missionsContent.tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={`rounded-xl p-6 border ${tierColors[index].bg} ${tierColors[index].border}`}
          >
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${tierColors[index].badge}`}>
              Tier {index + 1}
            </span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {tier.name.replace(`Tier ${index + 1}: `, '')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {tier.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowParentsUse() {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/mission-cards.png"
            alt="Flat lay of colorful mission cards for kids on a desk"
            width={500}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-6">
            How parents use them
          </h2>
          <ul className="space-y-4">
            {missionsContent.howParentsUse.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function DownloadCTA() {
  return (
    <Section background="soft">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Want to try a sample mission?
        </h2>
        <p className="text-gray-600 mb-6">
          Get a preview of what flying with mission cards feels like.
        </p>
        {/* TODO: Wire up download functionality when sample missions PDF is ready */}
        <button
          disabled
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
        >
          Download sample missions (coming soon)
        </button>
      </div>
    </Section>
  );
}

export default function MissionsPage() {
  return (
    <>
      <MissionsHero />
      <MissionTiers />
      <HowParentsUse />
      <DownloadCTA />
    </>
  );
}
