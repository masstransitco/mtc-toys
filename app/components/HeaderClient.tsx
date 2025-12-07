'use client'

import Link from 'next/link'
import { UserMenu } from './UserMenu'
import { CartIcon } from './CartIcon'

interface HeaderClientProps {
  user: { email: string } | null
}

export function HeaderClient({ user }: HeaderClientProps) {
  return (
    <div className="flex items-center gap-4">
      <CartIcon />

      {user ? (
        <UserMenu userEmail={user.email} />
      ) : (
        <Link
          href="/login"
          className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign in
        </Link>
      )}
    </div>
  )
}
