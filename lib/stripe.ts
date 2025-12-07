import Stripe from 'stripe'

// Lazy-initialize Stripe to avoid build-time errors when env vars not available
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-11-17.clover',
      typescript: true,
    })
  }
  return _stripe
}

// Keep backwards compatibility alias
export const stripe = {
  get checkout() { return getStripe().checkout },
  get webhooks() { return getStripe().webhooks },
}

// Format price from cents to display string
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100)
}
