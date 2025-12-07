'use client'

import Link from 'next/link'
import { useCart } from '@/app/hooks/useCart'
import { formatPrice } from '@/lib/stripe'
import { shippingConfig } from '@/app/content'

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { subtotal, itemCount } = useCart()

  const shipping = subtotal > 0 ? shippingConfig.flatRate : 0
  const total = subtotal + shipping

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {subtotal > 0 ? formatPrice(shipping) : '—'}
          </span>
        </div>

        {subtotal > 0 && (
          <p className="text-xs text-gray-500">{shippingConfig.label}</p>
        )}

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {showCheckoutButton && subtotal > 0 && (
        <Link
          href="/checkout"
          className="mt-6 block w-full py-3 px-6 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      )}

      {subtotal > 0 && (
        <p className="mt-4 text-xs text-center text-gray-500">
          Free shipping on orders over $100
        </p>
      )}
    </div>
  )
}
