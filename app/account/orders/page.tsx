import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrders } from '@/app/actions/orders'
import { formatPrice } from '@/lib/stripe'

export const metadata = {
  title: 'Orders – First Flight Lab',
}

function getStatusColor(status: string) {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'shipped':
      return 'bg-blue-100 text-blue-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'pending':
    default:
      return 'bg-yellow-100 text-yellow-800'
  }
}

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { orders } = await getOrders()

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/account"
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to account
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
          Order History
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="mt-4 text-gray-500">No orders yet</p>
            <Link
              href="/products"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-gray-900">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.ffl_order_items?.length || 0} item
                      {order.ffl_order_items?.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-sm text-blue-600">View details →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
