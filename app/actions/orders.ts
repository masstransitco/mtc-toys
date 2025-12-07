'use server'

import { createClient } from '@/lib/supabase/server'

export async function getOrders() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { orders: [] }
  }

  const { data: orders, error } = await supabase
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
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return { orders: [] }
  }

  return { orders: orders || [] }
}

export async function getOrderById(orderId: string) {
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
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single()

  if (error || !order) {
    return { error: 'Order not found' }
  }

  return { order }
}
