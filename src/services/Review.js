import supabase from '../config/SupabaseClient'

export const getReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, Mentee (first_name,last_name,college)')
  return { data, error }
}
