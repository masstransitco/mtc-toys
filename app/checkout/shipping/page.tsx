'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/app/hooks/useCart'
import { CartSummary } from '@/app/components/CartSummary'
import { getUserAddresses, saveAddress } from '@/app/actions/checkout'
import { analytics } from '@/lib/analytics'
import { shippingConfig } from '@/app/content'

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

export default function ShippingPage() {
  const router = useRouter()
  const { items } = useCart()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const checkoutTracked = useRef(false)

  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    is_default: false,
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
      return
    }

    // Track InitiateCheckout event once
    if (!checkoutTracked.current && items.length > 0) {
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const total = subtotal + shippingConfig.flatRate
      analytics.initiateCheckout(
        items.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total
      )
      checkoutTracked.current = true
    }

    async function fetchAddresses() {
      const { addresses } = await getUserAddresses()
      setAddresses(addresses)

      // Select default address if exists
      const defaultAddr = addresses.find((a: Address) => a.is_default)
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id)
      } else if (addresses.length === 0) {
        setShowNewForm(true)
      }

      setLoading(false)
    }

    fetchAddresses()
  }, [items, router])

  const handleNewAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const { address, error } = await saveAddress(newAddress)

    if (error) {
      setError(error)
      setSaving(false)
      return
    }

    if (address) {
      setAddresses([...addresses, address])
      setSelectedAddressId(address.id)
      setShowNewForm(false)
      setNewAddress({
        label: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
        is_default: false,
      })
    }

    setSaving(false)
  }

  const handleContinue = () => {
    const selected = addresses.find((a) => a.id === selectedAddressId)
    if (selected) {
      // Store selected address in sessionStorage for payment page
      sessionStorage.setItem('shipping_address', JSON.stringify(selected))
      router.push('/checkout/payment')
    }
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <nav className="flex items-center justify-center gap-4 text-sm">
            <span className="text-blue-600 font-medium">1. Shipping</span>
            <span className="text-gray-300">→</span>
            <span className="text-gray-400">2. Payment</span>
          </nav>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Shipping Address
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Saved Addresses */}
            {addresses.length > 0 && !showNewForm && (
              <div className="space-y-4 mb-6">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition ${
                      selectedAddressId === addr.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div>
                        {addr.label && (
                          <span className="text-xs font-medium text-gray-500 uppercase">
                            {addr.label}
                          </span>
                        )}
                        <p className="text-gray-900">{addr.street}</p>
                        <p className="text-gray-600">
                          {addr.city}, {addr.state} {addr.zip}
                        </p>
                      </div>
                      {selectedAddressId === addr.id && (
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </label>
                ))}

                <button
                  type="button"
                  onClick={() => setShowNewForm(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add new address
                </button>
              </div>
            )}

            {/* New Address Form */}
            {showNewForm && (
              <form onSubmit={handleNewAddressSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Home, Work, etc."
                    value={newAddress.label}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, label: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
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
                      required
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
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
                      required
                      value={newAddress.zip}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, zip: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      value={newAddress.country}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, country: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="US">United States</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={newAddress.is_default}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, is_default: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="is_default" className="text-sm text-gray-700">
                    Save as default address
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  )}
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

            {/* Continue Button */}
            {!showNewForm && selectedAddressId && (
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to cart
                </Link>
                <button
                  onClick={handleContinue}
                  className="ml-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Continue to Payment
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <CartSummary showCheckoutButton={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
