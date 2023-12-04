import supabase from '../config/SupabaseClient'

export const getChannels = async () => {
  const { data, error } = await supabase.from('channels').select()
  return { data, error }
}

export const getChannelsByMemberId = async (memberId) => {
  const { data, error } = await supabase
    .from('channels')
    .select()
    .contains('members', [memberId])

  return { data, error }
}

export const createChannel = async ([userId1, userId2]) => {
  console.log(userId1, userId2)
  const { data, error } = await supabase
    .from('channels')
    .insert([{ members: [userId1, userId2] }])
    .select()

  if (error) {
    console.log('Error creating channel:', error)
    return { data: null, error }
  }

  return { data, error: null }
}
