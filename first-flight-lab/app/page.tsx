import Image from 'next/image';
import {
  Button,
  Section,
  SectionHeader,
  FeatureGrid,
  TestimonialList,
  EmailCapture,
  CheckIcon,
} from './components';
import {
  heroContent,
  features,
  howItWorks,
  forKidsSection,
  testimonials,
  buySection,
} from './content';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight leading-tight">
              {heroContent.heading}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              {heroContent.subheading}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
              </Button>
              <Button href={heroContent.secondaryCta.href} variant="ghost">
                {heroContent.secondaryCta.label}
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-500">{heroContent.trustLine}</p>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="/hero-family-flight.png"
              alt="Parent and child playing with a foam RC jet in a bright modern living room"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <Section background="soft">
      <SectionHeader title="Why First Flight Lab?" />
      <FeatureGrid features={features} />
    </Section>
  );
}

function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <SectionHeader title="How it works" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {howItWorks.map((step) => (
          <div key={step.step} className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
              {step.step}
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ForKidsSection() {
  return (
    <Section background="soft">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/product-jet-closeup.png"
            alt="Close-up view of the First Flight Lab foam RC jet with controller"
            width={500}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
            Built for 5–9 year olds, with you by their side
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
            {forKidsSection.heading}
          </h2>
          {forKidsSection.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section>
      <SectionHeader title="What early families are saying" />
      <TestimonialList testimonials={testimonials} />
    </Section>
  );
}

function BuySection() {
  return (
    <Section id="buy" background="soft">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
          {buySection.heading}
        </h2>
        <div className="mt-8 bg-white rounded-xl p-8 border border-gray-100">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {buySection.productName}
          </h3>
          <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
            {buySection.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <p className="text-2xl font-semibold text-gray-900 mb-6">
            {buySection.price}
          </p>
          <EmailCapture ctaLabel={buySection.ctaLabel} />
        </div>
      </div>
    </Section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <HowItWorksSection />
      <ForKidsSection />
      <TestimonialsSection />
      <BuySection />
    </>
  );
}
