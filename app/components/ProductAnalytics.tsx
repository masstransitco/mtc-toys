'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

interface ProductAnalyticsProps {
  product: {
    id: string
    name: string
    price: number
  }
}

export function ProductAnalytics({ product }: ProductAnalyticsProps) {
  useEffect(() => {
    analytics.viewContent(product)
  }, [product])

  return null
}
