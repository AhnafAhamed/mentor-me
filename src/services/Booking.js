import supabase from '../config/SupabaseClient'

export const getBookings = async (id, status) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      '*, Mentee (first_name,last_name,college), Mentor (first_name,last_name)'
    )
    .eq('confirmation_status', status)
    .eq('booked_mentor', id)

  return { data, error }
}

export const getMentors = async () => {
  const { data, error } = await supabase.from('Mentor').select()
  console.log({ mentors: data })
  return { data, error }
}
