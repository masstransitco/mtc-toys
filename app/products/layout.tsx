import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Indoor RC Planes for Kids | Shop First Flight Lab',
  description: 'Shop beginner-friendly indoor RC foam jets designed for kids ages 5+. Safe, crash-resistant foam planes with easy controls. Free shipping on orders over $100. 30-day guarantee.',
  keywords: ['indoor RC plane for kids', 'beginner RC airplane', 'foam RC jet', 'kids remote control plane', 'indoor flying toy', 'RC plane for 5 year olds', 'safe RC plane for children'],
  openGraph: {
    title: 'Indoor RC Planes for Kids | First Flight Lab',
    description: 'Safe, beginner-friendly foam RC jets for kids ages 5+. Perfect for indoor flying in living rooms.',
    images: ['/products/pro-bundle.png'],
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
