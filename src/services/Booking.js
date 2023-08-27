import supabase from '../config/SupabaseClient'

export const getBookings = async (id, status) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      '*, Mentee (first_name,last_name,college), Mentor (first_name,last_name, workplace)'
    )
    .eq('meeting_status', status)
    .eq('booked_mentor', id)

  return { data, error }
}

export const getMenteeBookings = async (id, status) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      '*, Mentee (first_name,last_name,college), Mentor (first_name,last_name, workplace)'
    )
    .eq('meeting_status', status)
    .eq('booked_by', id)

  return { data, error }
}

export const updateBooking = async ([bookingId, status, link]) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ meeting_status: status, meeting_link: link })
    .eq('id', bookingId)
    .select()

  return { data, error }
}

export const addBooking = async (booking) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking[0])
    .select()

  return { data, error }
}
