import supabase from '../config/SupabaseClient'

export const getResources = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*, Mentor (first_name,last_name, image, workplace)')
  return { data, error }
}

export const getMentorResources = async (id) => {
  const { data, error } = await supabase
    .from('resources')
    .select('*, Mentor (first_name,last_name,image)')
    .eq('posted_by', id)
    .order('id', { ascending: false })

  return { data, error }
}

export const addResource = async (resource) => {
  const { data, error } = await supabase
    .from('resources')
    .insert(resource[0])
    .select('*')

  console.log({ data })

  return { data, error }
}
