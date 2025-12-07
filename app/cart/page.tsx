'use client'

import Link from 'next/link'
import { useCart } from '@/app/hooks/useCart'
import { CartItem } from '@/app/components/CartItem'
import { CartSummary } from '@/app/components/CartSummary'

export default function CartPage() {
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-gray-600">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-600 transition"
          >
            Clear cart
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="text-sm text-blue-600 hover:text-blue-700 transition flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue shopping
              </Link>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
