'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { logout } from '@/app/actions/auth'

interface UserMenuProps {
  userEmail: string
}

export function UserMenu({ userEmail }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition"
      >
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-medium text-sm">
            {userEmail.charAt(0).toUpperCase()}
          </span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500 truncate">{userEmail}</p>
          </div>

          <Link
            href="/account"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Account
          </Link>
          <Link
            href="/account/orders"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Orders
          </Link>
          <Link
            href="/account/addresses"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Addresses
          </Link>

          <div className="border-t border-gray-100 mt-1">
            <form action={logout}>
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
