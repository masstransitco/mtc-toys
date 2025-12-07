'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getAddresses() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { addresses: [] }
  }

  const { data: addresses, error } = await supabase
    .from('ffl_addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })

  if (error) {
    console.error('Error fetching addresses:', error)
    return { addresses: [] }
  }

  return { addresses: addresses || [] }
}

export async function createAddress(formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  const label = formData.get('label') as string
  const street = formData.get('street') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const zip = formData.get('zip') as string
  const country = formData.get('country') as string || 'US'
  const is_default = formData.get('is_default') === 'on'

  // If setting as default, unset other defaults first
  if (is_default) {
    await supabase
      .from('ffl_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)
  }

  const { data, error } = await supabase
    .from('ffl_addresses')
    .insert({
      user_id: user.id,
      label,
      street,
      city,
      state,
      zip,
      country,
      is_default,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating address:', error)
    return { error: 'Failed to create address' }
  }

  revalidatePath('/account/addresses')
  return { address: data }
}

export async function updateAddress(addressId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  const label = formData.get('label') as string
  const street = formData.get('street') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const zip = formData.get('zip') as string
  const country = formData.get('country') as string || 'US'
  const is_default = formData.get('is_default') === 'on'

  // If setting as default, unset other defaults first
  if (is_default) {
    await supabase
      .from('ffl_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id)
  }

  const { error } = await supabase
    .from('ffl_addresses')
    .update({
      label,
      street,
      city,
      state,
      zip,
      country,
      is_default,
    })
    .eq('id', addressId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating address:', error)
    return { error: 'Failed to update address' }
  }

  revalidatePath('/account/addresses')
  return { success: true }
}

export async function deleteAddress(addressId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('ffl_addresses')
    .delete()
    .eq('id', addressId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting address:', error)
    return { error: 'Failed to delete address' }
  }

  revalidatePath('/account/addresses')
  return { success: true }
}

export async function setDefaultAddress(addressId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  // Unset all defaults
  await supabase
    .from('ffl_addresses')
    .update({ is_default: false })
    .eq('user_id', user.id)

  // Set new default
  const { error } = await supabase
    .from('ffl_addresses')
    .update({ is_default: true })
    .eq('id', addressId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error setting default address:', error)
    return { error: 'Failed to set default address' }
  }

  revalidatePath('/account/addresses')
  return { success: true }
}
