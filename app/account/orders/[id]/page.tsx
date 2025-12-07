import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrderById } from '@/app/actions/orders'
import { formatPrice } from '@/lib/stripe'
import { products } from '@/app/content'

export const metadata = {
  title: 'Order Details – First Flight Lab',
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

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { order, error } = await getOrderById(id)

  if (error || !order) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/account/orders"
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to orders
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-gray-500">
              Placed on{' '}
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">
              Shipping Address
            </h2>
            <p className="text-gray-700">{order.shipping_address.street}</p>
            <p className="text-gray-700">
              {order.shipping_address.city}, {order.shipping_address.state}{' '}
              {order.shipping_address.zip}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-100">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Items</h2>
          <div className="space-y-4">
            {order.ffl_order_items.map((item: { id: string; product_id: string; quantity: number; price: number }) => {
              const product = products.find((p) => p.id === item.product_id)
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {product?.name || 'Product'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
