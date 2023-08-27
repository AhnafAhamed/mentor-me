import supabase from '../config/SupabaseClient'

export const getReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, Mentee (first_name,last_name,college)')
  return { data, error }
}

export const getMentorReviews = async (id) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, Mentee (first_name,last_name,college)')
    .eq('reviewed_mentor', id)

  return { data, error }
}
