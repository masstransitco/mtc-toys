'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getOrderBySessionId } from '@/app/actions/checkout'
import { formatPrice } from '@/lib/stripe'
import { products } from '@/app/content'

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  price: number
}

interface Order {
  id: string
  status: string
  subtotal: number
  shipping: number
  total: number
  shipping_address: {
    street: string
    city: string
    state: string
    zip: string
  }
  ffl_order_items: OrderItem[]
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    async function fetchOrder() {
      const result = await getOrderBySessionId(sessionId!)

      if (result.error) {
        setError(result.error)
      } else if (result.order) {
        setOrder(result.order)
      }

      setLoading(false)
    }

    fetchOrder()
  }, [sessionId])

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mb-6">
            Your payment was successful. You&apos;ll receive an email confirmation shortly.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Thank you for your order!
          </h1>
          <p className="text-gray-600">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {order.ffl_order_items.map((item) => {
              const product = products.find((p) => p.id === item.product_id)
              return (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-700">
                    {product?.name || 'Product'} × {item.quantity}
                  </span>
                  <span className="text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-2">Shipping Address</h2>
          <p className="text-gray-700">{order.shipping_address.street}</p>
          <p className="text-gray-700">
            {order.shipping_address.city}, {order.shipping_address.state}{' '}
            {order.shipping_address.zip}
          </p>
        </div>

        <div className="text-center space-x-4">
          <Link
            href="/account/orders"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            View Orders
          </Link>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
