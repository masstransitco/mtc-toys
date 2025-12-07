'use client'

import { useCartContext, CartItem } from '@/app/context/CartContext'

export type { CartItem }

export function useCart() {
  return useCartContext()
}
