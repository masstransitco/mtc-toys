'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateOrderStatus, OrderStatus } from '@/app/actions/admin-orders'

const statuses: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'failed']

export function StatusUpdateForm({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: OrderStatus
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<OrderStatus>(currentStatus)
  const [message, setMessage] = useState<string | null>(null)

  const handleUpdate = async () => {
    if (status === currentStatus) return

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, status)

      if (result.error) {
        setMessage(`Error: ${result.error}`)
      } else {
        setMessage('Status updated')
        router.refresh()
        setTimeout(() => setMessage(null), 3000)
      }
    })
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
        className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm"
        disabled={isPending}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <button
        onClick={handleUpdate}
        disabled={isPending || status === currentStatus}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isPending ? 'Updating...' : 'Update'}
      </button>

      {message && (
        <span className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </span>
      )}
    </div>
  )
}
