'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart, CartItem as CartItemType } from '@/app/hooks/useCart'
import { formatPrice } from '@/lib/stripe'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <Link
        href={`/products/${item.slug}`}
        className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden relative"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-medium text-gray-900 hover:text-blue-600 transition line-clamp-1"
        >
          {item.name}
        </Link>
        <p className="mt-1 text-sm text-gray-500">
          {formatPrice(item.price)} each
        </p>

        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-900 transition text-sm"
            >
              −
            </button>
            <span className="px-2 py-1 text-sm text-gray-900 min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-900 transition text-sm"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="text-sm text-red-600 hover:text-red-700 transition"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  )
}
