import { OrderStatus } from '@/app/actions/admin-orders'

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  failed: 'bg-red-100 text-red-800',
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusStyles[status]}`}>
      {status}
    </span>
  )
}
