'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdmin } from '@/lib/admin'
import { revalidatePath } from 'next/cache'

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'failed'

export type OrderWithItems = {
  id: string
  user_id: string
  stripe_session_id: string | null
  status: OrderStatus
  subtotal: number
  shipping: number
  total: number
  shipping_address: {
    street: string
    city: string
    state: string
    zip: string
    country?: string
  }
  created_at: string
  updated_at: string
  ffl_order_items: Array<{
    id: string
    product_id: string
    quantity: number
    price: number
  }>
  user_email?: string
}

// Verify admin access
async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user || !isAdmin(user.email)) {
    throw new Error('Unauthorized: Admin access required')
  }

  return user
}

// Get all orders with optional filters
export async function getAdminOrders(filters?: {
  status?: OrderStatus
  search?: string
  page?: number
  limit?: number
}): Promise<{ orders: OrderWithItems[]; total: number; page: number; limit: number; error?: string }> {
  try {
    await verifyAdmin()
  } catch {
    return { orders: [], total: 0, page: 1, limit: 20, error: 'Unauthorized' }
  }

  const adminClient = createAdminClient()
  const page = filters?.page ?? 1
  const limit = filters?.limit ?? 20
  const offset = (page - 1) * limit

  let query = adminClient
    .from('ffl_orders')
    .select('*, ffl_order_items(*)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data: orders, error, count } = await query

  if (error) {
    console.error('Error fetching orders:', error)
    return { orders: [], total: 0, page, limit, error: error.message }
  }

  // Fetch user emails for display
  const userIds = [...new Set(orders?.map(o => o.user_id) ?? [])]
  const { data: users } = await adminClient.auth.admin.listUsers()

  const userEmailMap = new Map(
    users?.users?.map(u => [u.id, u.email]) ?? []
  )

  const ordersWithEmail = (orders ?? []).map(order => ({
    ...order,
    user_email: userEmailMap.get(order.user_id) ?? 'Unknown'
  })) as OrderWithItems[]

  // Client-side search filter (for email/order ID)
  let filteredOrders = ordersWithEmail
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    filteredOrders = ordersWithEmail.filter(order =>
      order.id.toLowerCase().includes(searchLower) ||
      order.user_email?.toLowerCase().includes(searchLower)
    )
  }

  return {
    orders: filteredOrders,
    total: count ?? 0,
    page,
    limit
  }
}

// Get single order by ID
export async function getAdminOrderById(orderId: string): Promise<{ order?: OrderWithItems; error?: string }> {
  try {
    await verifyAdmin()
  } catch {
    return { error: 'Unauthorized' }
  }

  const adminClient = createAdminClient()

  const { data: order, error } = await adminClient
    .from('ffl_orders')
    .select('*, ffl_order_items(*)')
    .eq('id', orderId)
    .single()

  if (error || !order) {
    return { error: 'Order not found' }
  }

  // Get user email
  const { data: { users } } = await adminClient.auth.admin.listUsers()
  const user = users?.find(u => u.id === order.user_id)

  return {
    order: {
      ...order,
      user_email: user?.email ?? 'Unknown'
    } as OrderWithItems
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<{ success?: boolean; error?: string }> {
  try {
    await verifyAdmin()
  } catch {
    return { error: 'Unauthorized' }
  }

  const validStatuses: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'failed']
  if (!validStatuses.includes(status)) {
    return { error: 'Invalid status' }
  }

  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('ffl_orders')
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)

  if (error) {
    console.error('Error updating order status:', error)
    return { error: 'Failed to update order status' }
  }

  revalidatePath('/admin/orders')
  revalidatePath(`/admin/orders/${orderId}`)

  return { success: true }
}
