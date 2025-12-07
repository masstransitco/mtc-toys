'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/hooks/useCart'

export default function CheckoutPage() {
  const router = useRouter()
  const { items } = useCart()

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    } else {
      router.push('/checkout/shipping')
    }
  }, [items, router])

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
