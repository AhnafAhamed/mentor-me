import supabase from '../config/SupabaseClient'

export const getResources = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*, Mentor (first_name,last_name, image, workplace)')
  return { data, error }
}
