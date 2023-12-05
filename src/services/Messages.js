import supabase from '../config/SupabaseClient'

export const getMessages = async (channelId) => {
  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('channel', channelId)
  return { data, error }
}

export const addMessage = async ([channelId, message, owner]) => {
  const { data, error } = await supabase
    .from('messages')
    .insert({ channel: channelId, message: message, owner: owner })
    .select('*')

  console.log({ data })

  return { data, error }
}
