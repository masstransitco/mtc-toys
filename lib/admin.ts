// Admin email allowlist - add admin emails here
export const ADMIN_EMAILS = [
  'mark@forevercompanies.com',
  'mark@air.city',
] as const

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase() as typeof ADMIN_EMAILS[number])
}
