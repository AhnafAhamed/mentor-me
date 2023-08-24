import supabase from '../config/SupabaseClient'

export const getMentors = async () => {
  const { data, error } = await supabase.from('Mentor').select()
  return { data, error }
}

export const getMentor = async (id) => {
  const { data, error } = await supabase
    .from('Mentor')
    .select()
    .eq('user_uid', id)
  return { data, error }
}

export const updateMentor = async ([id, userData]) => {
  const { data, error } = await supabase
    .from('Mentor')
    .update(userData)
    .eq('user_uid', id)
    .select()
  return { data, error }
}
