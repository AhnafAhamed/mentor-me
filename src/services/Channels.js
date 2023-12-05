import supabase from '../config/SupabaseClient'

export const getChannels = async () => {
  const { data, error } = await supabase.from('channels').select()
  return { data, error }
}

export const getChannelsByMentorId = async (id) => {
  const { data, error } = await supabase
    .from('channels')
    .select(
      '*, Mentee (first_name,last_name,college, image), Mentor (first_name,last_name, workplace, image)'
    )
    .eq('mentor', id)

  return { data, error }
}

export const getChannelsByMenteeId = async (id) => {
  const { data, error } = await supabase
    .from('channels')
    .select(
      '*, Mentee (first_name,last_name,college, image), Mentor (first_name,last_name, workplace, image)'
    )
    .eq('mentee', id)

  return { data, error }
}

export const createChannel = async ([userId1, userId2]) => {
  console.log(userId1, userId2)
  const { data, error } = await supabase
    .from('channels')
    .insert({ mentor: userId1, mentee: userId2 })
    .select()

  if (error) {
    console.log('Error creating channel:', error)
    return { data: null, error }
  }

  return { data, error: null }
}
