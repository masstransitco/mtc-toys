import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Lazy-initialize Supabase admin client
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Get the order from metadata
      const orderId = session.metadata?.order_id
      const userId = session.metadata?.user_id

      if (orderId) {
        // Update order status to paid
        const supabase = getSupabaseAdmin()
        const { error } = await supabase
          .from('ffl_orders')
          .update({
            status: 'paid',
            stripe_session_id: session.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderId)

        if (error) {
          console.error('Error updating order:', error)
        } else {
          console.log(`Order ${orderId} marked as paid`)
        }
      }

      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.order_id

      if (orderId) {
        // Mark order as cancelled
        const supabase = getSupabaseAdmin()
        await supabase
          .from('ffl_orders')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderId)

        console.log(`Order ${orderId} cancelled due to session expiry`)
      }

      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
