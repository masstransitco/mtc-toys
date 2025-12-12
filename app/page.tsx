'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Section,
  SectionHeader,
  FeatureGrid,
  TestimonialList,
  EmailCapture,
  CheckIcon,
} from './components';
import {
  FadeIn,
  FadeInImmediate,
  StaggerContainer,
  StaggerItem,
  AnimatedButton,
  AnimatedCTAButton,
} from './components/animations';
import {
  heroContent,
  features,
  howItWorks,
  forKidsSection,
  testimonials,
  buySection,
} from './content';
import { floatAnimation, transitions } from '@/lib/animations';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-8 pb-16 sm:pt-12 sm:pb-24">
      {/* Decorative clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cloud-animate absolute top-20 left-10 w-32 h-16 bg-white/40 rounded-full blur-2xl" />
        <div className="cloud-animate-slow absolute top-40 right-20 w-48 h-24 bg-white/30 rounded-full blur-3xl" />
        <div className="cloud-animate absolute bottom-20 left-1/4 w-40 h-20 bg-primary-100/50 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <FadeInImmediate direction="up" delay={0.1}>
              <h1 className="text-hero-sm sm:text-hero lg:text-hero-lg font-display font-bold text-slate-900">
                {heroContent.heading}
              </h1>
            </FadeInImmediate>

            <FadeInImmediate direction="up" delay={0.2}>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                {heroContent.subheading}
              </p>
            </FadeInImmediate>

            <FadeInImmediate direction="up" delay={0.3}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <AnimatedCTAButton href={heroContent.primaryCta.href}>
                  {heroContent.primaryCta.label}
                </AnimatedCTAButton>
                <AnimatedButton href={heroContent.secondaryCta.href} variant="ghost" size="lg">
                  {heroContent.secondaryCta.label}
                </AnimatedButton>
              </div>
            </FadeInImmediate>

            <FadeInImmediate direction="up" delay={0.4}>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">{heroContent.trustLine}</p>
              </div>
            </FadeInImmediate>
          </div>

          <div className="order-1 lg:order-2">
            <FadeInImmediate direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-3xl blur-2xl opacity-40" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative w-full h-auto rounded-2xl shadow-xl"
                >
                  <source src="/hero-video.webm" type="video/webm" />
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </FadeInImmediate>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <Section background="soft">
      <FadeIn>
        <SectionHeader title="Why First Flight Lab?" />
      </FadeIn>
      <FeatureGrid features={features} />
    </Section>
  );
}

function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <FadeIn>
        <SectionHeader title="How it works" />
      </FadeIn>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {howItWorks.map((step) => (
          <StaggerItem key={step.step}>
            <div className="text-center group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={transitions.spring}
                className="w-14 h-14 bg-gradient-cta text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-glow"
              >
                {step.step}
              </motion.div>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{step.text}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

function JetDiagram() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Top View */}
      <div className="relative">
        <Image
          src="/jet-top.webp"
          alt="Top view of First Flight Lab indoor RC foam jet showing 25.5cm wingspan - perfect size for indoor flying"
          width={350}
          height={350}
          className="w-full max-w-[350px]"
        />
        {/* Height dimension */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center -translate-x-8">
          <div className="relative h-full flex items-center">
            <div className="h-full border-l border-dashed border-slate-400" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-slate-400 text-sm whitespace-nowrap">24cm</span>
          </div>
        </div>
        {/* Width dimension */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-6 flex justify-center">
          <div className="relative w-full flex justify-center items-center">
            <div className="w-full border-t border-dashed border-slate-400" />
            <span className="absolute text-slate-400 text-sm bg-slate-900 px-2">25.5cm</span>
          </div>
        </div>
      </div>

      {/* Front View */}
      <div className="relative mt-8">
        <Image
          src="/jet-front.webp"
          alt="Front view of First Flight Lab foam RC plane - slim 4.2cm profile for safe indoor flying"
          width={350}
          height={100}
          className="w-full max-w-[350px]"
        />
        {/* Height dimension */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center -translate-x-8">
          <div className="relative h-full flex items-center">
            <div className="h-full border-l border-dashed border-slate-400" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-slate-400 text-sm whitespace-nowrap">4.2cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecsSection() {
  const specs = [
    { label: 'Dimensions', value: '25.5 × 24 × 4.2 cm' },
    { label: 'Weight', value: '85g (ultra-light)' },
    { label: 'Material', value: 'EPP Foam' },
    { label: 'Flight Time', value: '8-10 minutes' },
    { label: 'Charge Time', value: '45 minutes' },
    { label: 'Range', value: '30m indoor' },
  ];

  return (
    <Section background="dark">
      <FadeIn>
        <SectionHeader title="Technical Specs" light />
      </FadeIn>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn direction="left">
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <JetDiagram />
          </div>
        </FadeIn>
        <FadeIn direction="right" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 border border-primary-100 shadow-soft"
              >
                <p className="text-sm text-slate-500 mb-1">{spec.label}</p>
                <p className="text-lg font-display font-bold text-slate-900">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function ForKidsSection() {
  return (
    <Section background="warm">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn direction="left">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary-200 to-coral-200 rounded-3xl blur-2xl opacity-40" />
            <Image
              src="/product-jet-closeup.png"
              alt="First Flight Lab foam RC jet with beginner-friendly controller - designed for kids ages 5+"
              width={500}
              height={400}
              className="relative w-full h-auto rounded-2xl shadow-large"
            />
          </div>
        </FadeIn>
        <FadeIn direction="right" delay={0.2}>
          <div>
            <span className="inline-block px-4 py-1.5 bg-secondary-100 text-secondary-700 text-sm font-semibold rounded-full mb-4">
              Built for 5–9 year olds
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
              {forKidsSection.heading}
            </h2>
            {forKidsSection.paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-4 text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section>
      <FadeIn>
        <SectionHeader title="What early families are saying" />
      </FadeIn>
      <TestimonialList testimonials={testimonials} />
    </Section>
  );
}

function BuySection() {
  return (
    <Section id="buy" background="soft">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            {buySection.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={transitions.spring}
            className="mt-8 bg-white rounded-3xl p-8 border border-primary-100 shadow-large hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-display font-bold text-slate-900 mb-6">
              {buySection.productName}
            </h3>
            <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
              {buySection.features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-3xl font-display font-bold text-slate-900 mb-6">
              {buySection.price}
            </p>
            <EmailCapture ctaLabel={buySection.ctaLabel} />
          </motion.div>
        </FadeIn>
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
      <SpecsSection />
      <ForKidsSection />
      <TestimonialsSection />
      <BuySection />
    </>
  );
}
