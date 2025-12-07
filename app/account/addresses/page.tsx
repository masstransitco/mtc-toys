'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  getAddresses,
  createAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/app/actions/addresses'

interface Address {
  id: string
  label: string | null
  street: string
  city: string
  state: string
  zip: string
  country: string
  is_default: boolean
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchAddresses() {
      const { addresses } = await getAddresses()
      setAddresses(addresses)
      setLoading(false)
    }
    fetchAddresses()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const { address, error } = await createAddress(formData)

    if (error) {
      setError(error)
      setSaving(false)
      return
    }

    if (address) {
      // If new address is default, update others
      if (address.is_default) {
        setAddresses(
          addresses
            .map((a) => ({ ...a, is_default: false }))
            .concat(address)
        )
      } else {
        setAddresses([...addresses, address])
      }
      setShowForm(false)
    }

    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return

    const { error } = await deleteAddress(id)
    if (!error) {
      setAddresses(addresses.filter((a) => a.id !== id))
    }
  }

  const handleSetDefault = async (id: string) => {
    const { error } = await setDefaultAddress(id)
    if (!error) {
      setAddresses(
        addresses.map((a) => ({
          ...a,
          is_default: a.id === id,
        }))
      )
    }
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="text-gray-500 hover:text-gray-700">
            ← Back to account
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Saved Addresses
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Address
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Add Address Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white border border-gray-200 rounded-xl p-6"
          >
            <h2 className="font-semibold text-gray-900 mb-4">New Address</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (optional)
                </label>
                <input
                  type="text"
                  name="label"
                  placeholder="Home, Work, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    defaultValue="US"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="US">United States</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_default"
                  id="is_default"
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_default" className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Address'}
              </button>
            </div>
          </form>
        )}

        {/* Address List */}
        {addresses.length === 0 && !showForm ? (
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="mt-4 text-gray-500">No saved addresses</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    {addr.label && (
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        {addr.label}
                      </span>
                    )}
                    {addr.is_default && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        Default
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-900">{addr.street}</p>
                <p className="text-gray-600">
                  {addr.city}, {addr.state} {addr.zip}
                </p>

                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                  {!addr.is_default && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Set as default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
