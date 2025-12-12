'use server'

import { createClient } from '@/lib/supabase/server'

type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
}

export async function getOrders() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { orders: [] }
  }

  const { data: orders, error: ordersError } = await supabase
    .from('ffl_orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (ordersError || !orders) {
    console.error('Error fetching orders:', ordersError?.message ?? ordersError)
    return { orders: [] }
  }

  const orderIds = orders.map((order) => order.id)

  if (orderIds.length === 0) {
    return { orders: [] }
  }

  const { data: items, error: itemsError } = await supabase
    .from('ffl_order_items')
    .select('id, order_id, product_id, quantity, price')
    .in('order_id', orderIds)

  if (itemsError) {
    console.error('Error fetching order items:', itemsError?.message ?? itemsError)
  }

  const itemsByOrderId = (items || []).reduce<Record<string, OrderItem[]>>((acc, item) => {
    const list = acc[item.order_id] || []
    list.push(item)
    acc[item.order_id] = list
    return acc
  }, {})

  const ordersWithItems = orders.map((order) => ({
    ...order,
    ffl_order_items: itemsByOrderId[order.id] || [],
  }))

  return { orders: ordersWithItems }
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  const { data: order, error: orderError } = await supabase
    .from('ffl_orders')
    .select('*')
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single()

  if (orderError || !order) {
    return { error: 'Order not found' }
  }

  const { data: items, error: itemsError } = await supabase
    .from('ffl_order_items')
    .select('id, product_id, quantity, price')
    .eq('order_id', order.id)

  if (itemsError) {
    console.error('Error fetching order items:', itemsError?.message ?? itemsError)
  }

  return { order: { ...order, ffl_order_items: items || [] } }
}
