'use server'

import { createClient } from '@/lib/supabase/server'

export async function subscribeEmail(email: string, source: string = 'website') {
  const supabase = await createClient()

  const { error } = await supabase
    .from('ffl_subscribers')
    .upsert(
      { email, source, subscribed_at: new Date().toISOString() },
      { onConflict: 'email' }
    )

  if (error) {
    console.error('Subscription error:', error)
    return { success: false, error: 'Failed to subscribe' }
  }

  return { success: true }
}
