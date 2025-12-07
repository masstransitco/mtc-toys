'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/app/hooks/useCart'
import { formatPrice } from '@/lib/stripe'
import { shippingConfig } from '@/app/content'
import { createCheckoutSession } from '@/app/actions/checkout'

interface ShippingAddress {
  id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export default function PaymentPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const shipping = shippingConfig.flatRate
  const total = subtotal + shipping

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
      return
    }

    // Get shipping address from session storage
    const stored = sessionStorage.getItem('shipping_address')
    if (!stored) {
      router.push('/checkout/shipping')
      return
    }

    setShippingAddress(JSON.parse(stored))
  }, [items, router])

  const handlePayment = async () => {
    if (!shippingAddress) return

    setLoading(true)
    setError('')

    const { url, error } = await createCheckoutSession(items, shippingAddress)

    if (error) {
      setError(error)
      setLoading(false)
      return
    }

    if (url) {
      // Clear cart before redirect (will be restored if payment fails)
      clearCart()
      sessionStorage.removeItem('shipping_address')
      window.location.href = url
    }
  }

  if (!shippingAddress) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <nav className="flex items-center justify-center gap-4 text-sm">
            <span className="text-green-600">✓ 1. Shipping</span>
            <span className="text-gray-300">→</span>
            <span className="text-blue-600 font-medium">2. Payment</span>
          </nav>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Review Your Order
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Shipping Address Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-medium text-gray-900">Shipping to</h2>
                <Link
                  href="/checkout/shipping"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Edit
                </Link>
              </div>
              <p className="text-gray-700">{shippingAddress.street}</p>
              <p className="text-gray-700">
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
              </p>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h2 className="font-medium text-gray-900 mb-4">Items</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Button */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/checkout/shipping"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to shipping
              </Link>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="ml-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center">
              You&apos;ll be securely redirected to Stripe to complete your payment.
            </p>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
                  </span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">{formatPrice(shipping)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
