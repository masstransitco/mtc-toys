import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAdminOrderById } from '@/app/actions/admin-orders'
import { formatPrice } from '@/lib/stripe'
import { products } from '@/app/content'
import { OrderStatusBadge } from '../../components/OrderStatusBadge'
import { StatusUpdateForm } from '../../components/StatusUpdateForm'

export const metadata = {
  title: 'Order Details – Admin – First Flight Lab',
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { order, error } = await getAdminOrderById(id)

  if (error || !order) {
    notFound()
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back to orders
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-gray-500">
            Placed on {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-gray-600 mt-1">
            Customer: <span className="font-medium">{order.user_email}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <OrderStatusBadge status={order.status} />
          <StatusUpdateForm orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Items</h2>
          <div className="space-y-4">
            {order.ffl_order_items.map((item) => {
              const product = products.find((p) => p.id === item.product_id)
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {product?.name || `Product: ${item.product_id.slice(0, 8)}`}
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">{formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-100">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Shipping Address</h2>
            <p className="text-gray-700">{order.shipping_address.street}</p>
            <p className="text-gray-700">
              {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
            </p>
            {order.shipping_address.country && (
              <p className="text-gray-700">{order.shipping_address.country}</p>
            )}
          </div>

          {/* Stripe Info */}
          {order.stripe_session_id && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Payment</h2>
              <p className="text-sm text-gray-600 break-all">
                Stripe Session: {order.stripe_session_id}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
