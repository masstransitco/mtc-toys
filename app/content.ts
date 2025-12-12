export const siteConfig = {
  name: 'First Flight Lab',
  tagline: 'Indoor RC planes designed for kids ages 5+',
  description:
    'First Flight Lab makes beginner-friendly indoor RC foam jets for kids. Our crash-resistant planes with easy controls are perfect for living room flying. Designed for ages 5+ with parent-child mission cards.',
};

export const navigation = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Missions', href: '/missions' },
    { label: 'Safety', href: '/safety' },
  ],
};

export const products = [
  {
    id: 'starter-bundle',
    slug: 'starter-bundle',
    name: 'Indoor RC Plane for Kids – Starter Bundle',
    price: 5999,
    description: 'The perfect beginner RC airplane for kids ages 5+. Includes foam jet, easy-to-use controller, and mission cards for indoor flying.',
    features: [
      '1 crash-resistant foam RC jet',
      'Beginner-mode controller with easy controls',
      '2 rechargeable batteries (16-20 min flight time)',
      'Mission card pack for guided flying activities',
      '30-day Crash Comfort guarantee',
    ],
    image: '/products/starter-bundle.png',
  },
  {
    id: 'pro-bundle',
    slug: 'pro-bundle',
    name: 'Indoor RC Plane for Kids – Pro Bundle',
    price: 8999,
    description: 'Best-selling RC plane bundle for kids with extended flight time. Perfect for young pilots ready for more indoor flying adventures.',
    features: [
      'Everything in Starter Bundle',
      '4 rechargeable batteries (32-40 min total flight time)',
      'Replacement foam shell for crash protection',
      'Advanced mission card pack with 20+ challenges',
      'Carry case for storage and travel',
    ],
    image: '/products/pro-bundle.png',
  },
  {
    id: 'family-pack',
    slug: 'family-pack',
    name: 'Indoor RC Planes – Family Pack (2 Jets)',
    price: 14999,
    description: 'Two complete RC plane sets for siblings or parent-child flying. Race, challenge, and learn together with beginner-friendly foam jets.',
    features: [
      '2 crash-resistant foam RC jets',
      '2 beginner-mode controllers',
      '6 rechargeable batteries (48-60 min total flight time)',
      '2 replacement foam shells',
      'Complete mission card collection (30+ activities)',
      '2 carry cases',
    ],
    image: '/products/family-pack.png',
  },
];

export const shippingConfig = {
  flatRate: 799,
  label: 'Standard Shipping (5-7 business days)',
};

export const heroContent = {
  heading: 'Your child\'s first safe flight, in your living room.',
  subheading:
    'First Flight Lab foam jets are designed for living room flying. Crash-resistant, beginner-friendly controls, and guided mission cards make it the perfect first RC plane for children.',
  primaryCta: { label: 'Shop RC Planes', href: '#buy' },
  secondaryCta: { label: 'See how it works', href: '#how-it-works' },
  trustLine:
    'Designed for kids ages 5+ with adult supervision. Indoor-safe foam, beginner-friendly controls.',
};

export const features = [
  {
    icon: 'shield' as const,
    title: 'Crash-resistant foam RC design',
    body: 'Lightweight EPP foam absorbs impacts without damage. Protected ducted fans keep fingers safe. Perfect for indoor flying in living rooms and playrooms.',
  },
  {
    icon: 'gauge' as const,
    title: 'Beginner-friendly RC controls',
    body: 'Beginner mode limits speed and angle so first flights feel calm and controllable. Easy-to-use controller perfect for kids ages 5 and up.',
  },
  {
    icon: 'users' as const,
    title: 'Parent-child flying activities',
    body: 'Mission cards turn RC flying into guided games: takeoff checklists, rescue runs, and obstacle courses. Learn together with 30+ activities.',
  },
  {
    icon: 'heart' as const,
    title: '30-day crash guarantee',
    body: 'If your child damages the foam in the first 30 days, we\'ll send a free replacement shell. Risk-free indoor flying for beginners.',
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
