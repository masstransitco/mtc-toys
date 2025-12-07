export const siteConfig = {
  name: 'First Flight Lab',
  tagline: 'Your child\'s first safe flight, in your living room.',
  description:
    'First Flight Lab turns a gentle foam jet and a simple controller into a crash-friendly flying lesson for kids 5+ and their parents.',
};

export const navigation = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Missions', href: '/missions' },
    { label: 'Safety', href: '/safety' },
  ],
};

export const heroContent = {
  heading: 'Your child\'s first safe flight, in your living room.',
  subheading:
    'First Flight Lab turns a gentle foam jet and a simple controller into a crash-friendly flying lesson for kids 5+ and their parents.',
  primaryCta: { label: 'Shop the Jet', href: '#buy' },
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
  trustLine:
    'Designed for ages 5+ with adult supervision. Indoor-tuned, beginner-friendly controls.',
};

export const features = [
  {
    icon: 'shield' as const,
    title: 'Indoor-safe foam design',
    body: 'Lightweight EPP foam and protected fans are tuned for living rooms and playrooms, not open fields. Softer bumps, fewer tears.',
  },
  {
    icon: 'gauge' as const,
    title: 'Beginner mode by default',
    body: 'A gentle flight profile limits speed and angle so first flights feel calm and controllable, even for small hands.',
  },
  {
    icon: 'users' as const,
    title: 'Parent–child mission cards',
    body: 'Guided "missions" turn flying into a shared game: take-off checklists, rescue runs, chair-gate fly-throughs, and more.',
  },
  {
    icon: 'heart' as const,
    title: 'Crash comfort guarantee',
    body: 'If your child cracks the foam in the first 30 days, we\'ll send a replacement foam shell from our Oops Kit.',
  },
];

export const howItWorks = [
  {
    step: 1,
    title: 'Prep together',
    text: 'Charge the battery, snap in the landing gear, and walk through the First Flight Checklist together in under 10 minutes.',
  },
  {
    step: 2,
    title: 'First indoor take-off',
    text: 'Switch to Beginner Mode, stand in a clear living room zone, and use one-stick throttle with assisted leveling.',
  },
  {
    step: 3,
    title: 'Level up with missions',
    text: 'Progress from simple take-off and landing to gentle turns, figure-eights, and mission cards your child can "graduate" from.',
  },
];

export const forKidsSection = {
  heading: 'Less chaos, more shared wins.',
  paragraphs: [
    'Most RC planes are tuned for open fields and older hobbyists. First Flight Lab is tuned for small rooms, short attention spans, and nervous parents.',
    'Clear language, gentle defaults, and simple rituals help kids feel brave without feeling out of control — and help parents feel safe handing over the controller.',
  ],
};

// TODO: Replace with real testimonials before launch
export const testimonials = [
  {
    quote:
      'My 6-year-old was flying within minutes. The beginner mode made all the difference — no crashes, just pure joy.',
    name: 'Sarah M.',
    attribution: 'Parent of age 6',
  },
  {
    quote:
      'We love the mission cards. Every Saturday morning is now "flight school" time in our living room.',
    name: 'David L.',
    attribution: 'Parent of age 7',
  },
  {
    quote:
      'Finally, an RC toy that doesn\'t terrify me as a parent. The foam design feels genuinely safe.',
    name: 'Michelle R.',
    attribution: 'Parent of age 5',
  },
];

export const buySection = {
  heading: 'Ready for your child\'s first indoor flight?',
  productName: 'First Flight Lab Jet – Starter Bundle',
  features: [
    '1 foam RC jet',
    'Beginner-mode controller',
    '2 rechargeable batteries',
    'Mission card pack (printable + in-box)',
    '30-day Crash Comfort replacement foam',
  ],
  price: 'From $59.99',
  ctaLabel: 'Join the launch list',
};

export const missionsContent = {
  hero: {
    heading: 'Turn first flights into tiny adventures.',
    subheading:
      'Mission cards give you ready-made games so you never have to invent what to do with the jet next.',
  },
  tiers: [
    {
      name: 'Tier 1: First Take-offs',
      description: 'Simple straight-line flights and soft landings.',
    },
    {
      name: 'Tier 2: Around the Room',
      description:
        'Gentle turns, figure-eight paths, flying through a "chair gate."',
    },
    {
      name: 'Tier 3: Rescue Runs',
      description:
        'Pick-up and drop-off points: fly from "island" sofa to "hospital" rug without touching anything in between.',
    },
  ],
  howParentsUse: [
    'Pick one mission card per session.',
    'Let your child stick it on the fridge when completed.',
    'Use missions as gentle progression instead of open-ended chaos.',
  ],
};

export const safetyContent = {
  heading: 'Safety first, fun always.',
  sections: [
    {
      title: 'Indoor-first design',
      content:
        'Our jets are built with soft EPP foam that absorbs impacts without causing damage. Protected ducted fans prevent fingers from reaching spinning parts. Recommended room size: 10×12 feet minimum, clear of fragile objects.',
    },
    {
      title: 'Recommended age & supervision',
      content:
        'Designed for ages 5+ with an adult in the room. Older kids (8+) can fly more independently after practice. Always supervise initial flights and help with pre-flight checks.',
    },
    {
      // TODO: Update with actual certification details when testing is complete
      title: 'What we test',
      content:
        'Testing in progress for: ASTM F963 (Toy Safety Standard), CPSIA (Consumer Product Safety), UN38.3 (Battery Transport Safety). Full compliance documentation coming soon.',
    },
    {
      title: 'House rules we suggest',
      bullets: [
        'Clear floor of small toys and obstacles',
        'Keep pets in another room during flight time',
        'Avoid flying near stairs or open doors',
        'Designate a "flight zone" away from breakables',
        'Always do the pre-flight checklist together',
        'Land when the battery indicator shows low',
      ],
    },
  ],
};

export const footer = {
  copyright: '© First Flight Lab.',
  disclaimer:
    'All product images are renders or prototypes; final product may vary slightly.',
};
