'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { products } from '@/app/content'
import { formatPrice } from '@/lib/stripe'
import { FadeIn, StaggerContainer, StaggerItem } from '@/app/components/animations'
import { transitions, cardHover, imageZoom } from '@/lib/animations'

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const isPopular = index === 1; // Pro Bundle is most popular

  return (
    <StaggerItem>
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardHover}
      >
        <Link
          href={`/products/${product.slug}`}
          className="group block bg-white rounded-2xl border border-primary-100 overflow-hidden relative"
        >
          {isPopular && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5, ...transitions.spring }}
              className="absolute top-4 left-0 z-10 bg-gradient-playful text-white text-xs font-bold px-4 py-1.5 rounded-r-full shadow-medium"
            >
              Most Popular
            </motion.div>
          )}

          <div className="aspect-square bg-surface relative overflow-hidden">
            <motion.div variants={imageZoom} className="w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="font-display font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
            <p className="mt-2 text-sm text-slate-500 line-clamp-2">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xl font-display font-bold text-slate-900">
                {formatPrice(product.price)}
              </p>
              <motion.span
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={transitions.spring}
                className="text-primary-600 font-semibold text-sm"
              >
                View &rarr;
              </motion.span>
            </div>
          </div>
        </Link>
      </motion.div>
    </StaggerItem>
  )
}

export default function ProductsPage() {
  return (
    <div className="py-16 bg-gradient-sky min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            Shop First Flight Lab
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the perfect bundle for your young pilot. All bundles include our 30-day Crash Comfort guarantee.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}
