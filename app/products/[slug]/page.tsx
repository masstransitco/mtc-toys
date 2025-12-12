import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { products } from '@/app/content'
import { formatPrice } from '@/lib/stripe'
import { AddToCartButton } from '@/app/components/AddToCartButton'
import { CheckIcon } from '@/app/components'
import { ProductAnalytics } from '@/app/components/ProductAnalytics'
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/structured-data'
import { SocialShareButtons } from '@/app/components/SocialShareButtons'
import { ProductImageGallery } from '@/app/components/ProductImageGallery'

const SITE_URL = 'https://www.firstflightlab.com'

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  const url = `${SITE_URL}/products/${product.slug}`
  const imageUrl = `${SITE_URL}${product.image}`

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      type: 'website',
      url,
      title: product.name,
      description: product.description,
      images: [{
        url: imageUrl,
        width: 800,
        height: 800,
        alt: product.name,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const productUrl = `${SITE_URL}/products/${product.slug}`
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: product.name, url: productUrl },
  ]

  return (
    <>
      <ProductAnalytics product={{ id: product.id, name: product.name, price: product.price }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateProductSchema(product),
            generateBreadcrumbSchema(breadcrumbs),
          ]),
        }}
      />
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <ProductImageGallery
              images={product.images || [product.image]}
              productName={product.name}
            />

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {product.description}
              </p>

              <p className="mt-6 text-3xl font-semibold text-gray-900">
                {formatPrice(product.price)}
              </p>

              <div className="mt-8">
                <AddToCartButton product={product} />
              </div>

              <div className="mt-6">
                <SocialShareButtons
                  url={productUrl}
                  title={product.name}
                  description={product.description}
                  image={`${SITE_URL}${product.image}`}
                />
              </div>

              <div className="mt-10">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  What&apos;s included
                </h2>
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Free shipping</strong> on orders over $100. All orders include our 30-day Crash Comfort guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
