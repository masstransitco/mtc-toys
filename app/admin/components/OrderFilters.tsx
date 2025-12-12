'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { OrderStatus } from '@/app/actions/admin-orders'

const statuses: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'failed']

export function OrderFilters({
  currentStatus,
  currentSearch,
}: {
  currentStatus?: OrderStatus
  currentSearch?: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(currentSearch ?? '')

  const updateFilters = (status?: OrderStatus, searchValue?: string) => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (searchValue) params.set('search', searchValue)

    startTransition(() => {
      router.push(`/admin/orders?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by order ID or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && updateFilters(currentStatus, search)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Status filter */}
      <select
        value={currentStatus ?? ''}
        onChange={(e) => updateFilters(e.target.value as OrderStatus || undefined, search)}
        className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      {/* Search button */}
      <button
        onClick={() => updateFilters(currentStatus, search)}
        disabled={isPending}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isPending ? 'Searching...' : 'Search'}
      </button>

      {/* Clear filters */}
      {(currentStatus || currentSearch) && (
        <button
          onClick={() => {
            setSearch('')
            updateFilters()
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Clear
        </button>
      )}
    </div>
  )
}
