import { siteConfig } from '@/app/content'

const SITE_URL = 'https://www.firstflightlab.com'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  description: string
  image: string
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: siteConfig.description,
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
  }
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    url: `${SITE_URL}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'First Flight Lab',
    },
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/products/${product.slug}`,
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema() {
  const faqs = [
    {
      question: 'What age is this RC plane suitable for?',
      answer: 'First Flight Lab RC planes are designed for kids ages 5 and up with adult supervision. The beginner-friendly controls and gentle flight profile make it perfect for young pilots.',
    },
    {
      question: 'Can it really fly indoors?',
      answer: 'Yes! Our foam RC jets are specifically designed for indoor flying in living rooms, playrooms, and basements. The lightweight EPP foam and tuned motors make it safe for indoor use.',
    },
    {
      question: 'Is it safe for kids?',
      answer: 'Absolutely. The crash-resistant EPP foam absorbs impacts, protected ducted fans keep fingers safe, and beginner mode limits speed. We also include a 30-day crash guarantee.',
    },
    {
      question: 'How long does the battery last?',
      answer: 'Each battery provides 8-10 minutes of flight time. The Starter Bundle includes 2 batteries (16-20 min), Pro Bundle includes 4 batteries (32-40 min).',
    },
    {
      question: 'What if it crashes and breaks?',
      answer: 'Our 30-day Crash Comfort Guarantee covers damage. If your child cracks the foam in the first 30 days, we\'ll send a free replacement shell.',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
