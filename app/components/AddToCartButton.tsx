'use client'

import { useState } from 'react'
import { useCart } from '@/app/hooks/useCart'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    )

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
          Quantity
        </label>
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-gray-600 hover:text-gray-900 transition"
          >
            -
          </button>
          <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-gray-600 hover:text-gray-900 transition"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`w-full py-3 px-6 rounded-lg font-medium transition ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {added ? 'Added to cart!' : 'Add to cart'}
      </button>
    </div>
  )
}
