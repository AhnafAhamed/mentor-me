import supabase from '../config/SupabaseClient'

export const getMentors = async () => {
  const { data, error } = await supabase.from('Mentor').select()
  console.log({ mentors: data })
  return { data, error }
}

export const getMentor = async (id) => {
  const { data, error } = await supabase.from('Mentor').select().eq('id', id)
  return data ? data : error
}

export const updateMentor = async ([id, userData]) => {
  const { data, error } = await supabase
    .from('Mentor')
    .update(userData)
    .eq('user_uid', id)
    .select()
  return { data, error }
}
