import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrders } from '@/app/actions/orders'
import { formatPrice } from '@/lib/stripe'

export const metadata = {
  title: 'Account – First Flight Lab',
}

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { orders } = await getOrders()
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/account/orders"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Orders</h2>
                <p className="text-sm text-gray-500">View order history</p>
              </div>
            </div>
          </Link>

          <Link
            href="/account/addresses"
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Addresses</h2>
                <p className="text-sm text-gray-500">Manage shipping addresses</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            {orders.length > 0 && (
              <Link
                href="/account/orders"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>
            )}
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-sm capitalize text-gray-500">
                        {order.status}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
