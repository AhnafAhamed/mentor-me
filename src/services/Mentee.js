import supabase from '../config/SupabaseClient'

export const getMentees = async () => {
  const { data, error } = await supabase.from('Mentee').select()
  return data ? data : error
}

export const getMentee = async (id) => {
  const { data, error } = await supabase
    .from('Mentee')
    .select()
    .eq('user_uid', id)
  return data ? data : error
}

export const updateMentee = async ([id, userData]) => {
  console.log({ id, userData })
  const { data, error } = await supabase
    .from('Mentee')
    .update(userData)
    .eq('user_uid', id)
    .select()
  return { data, error }
}
