'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { products, shippingConfig } from '@/app/content'

interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  image: string
}

interface ShippingAddress {
  id?: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export async function createCheckoutSession(
  items: CartItem[],
  shippingAddress: ShippingAddress
) {
  const supabase = await createClient()

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'You must be logged in to checkout' }
  }

  // Validate cart items against product catalog
  const validatedItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`)
    }
    return {
      ...item,
      price: product.price, // Use server-side price
      name: product.name,
    }
  })

  // Calculate totals
  const subtotal = validatedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = shippingConfig.flatRate
  const total = subtotal + shipping

  // Create order in database
  const { data: order, error: orderError } = await supabase
    .from('ffl_orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      subtotal,
      shipping,
      total,
      shipping_address: shippingAddress,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Error creating order:', orderError)
    return { error: 'Failed to create order' }
  }

  // Create order items
  const orderItems = validatedItems.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase
    .from('ffl_order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    // Clean up the order
    await supabase.from('ffl_orders').delete().eq('id', order.id)
    return { error: 'Failed to create order items' }
  }

  // Create Stripe checkout session
  const lineItems = validatedItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [`${process.env.NEXT_PUBLIC_APP_URL}${item.image}`],
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }))

  // Add shipping as line item
  lineItems.push({
    price_data: {
      currency: 'usd',
      product_data: {
        name: shippingConfig.label,
        images: [],
      },
      unit_amount: shipping,
    },
    quantity: 1,
  })

  try {
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/payment`,
      customer_email: user.email,
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
    })

    return { url: session.url }
  } catch (err) {
    console.error('Error creating Stripe session:', err)
    // Mark order as failed
    await supabase
      .from('ffl_orders')
      .update({ status: 'failed' })
      .eq('id', order.id)
    return { error: 'Failed to create payment session' }
  }
}

export async function getOrderBySessionId(sessionId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  const { data: order, error } = await supabase
    .from('ffl_orders')
    .select(`
      *,
      ffl_order_items (
        id,
        product_id,
        quantity,
        price
      )
    `)
    .eq('stripe_session_id', sessionId)
    .eq('user_id', user.id)
    .single()

  if (error || !order) {
    return { error: 'Order not found' }
  }

  return { order }
}

export async function getUserAddresses() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { addresses: [] }
  }

  const { data: addresses, error } = await supabase
    .from('ffl_addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })

  if (error) {
    console.error('Error fetching addresses:', error)
    return { addresses: [] }
  }

  return { addresses: addresses || [] }
}

export async function saveAddress(address: Omit<ShippingAddress, 'id'> & { label?: string; is_default?: boolean }) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  // If setting as default, unset other defaults first
  if (address.is_default) {
    await supabase
      .from('ffl_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)
  }

  const { data, error } = await supabase
    .from('ffl_addresses')
    .insert({
      user_id: user.id,
      ...address,
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving address:', error)
    return { error: 'Failed to save address' }
  }

  return { address: data }
}
