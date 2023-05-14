import supabase from '../config/SupabaseClient'
export const signUp = async (formData) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        role: formData.role
      }
    }
  })
  console.log({ data })
  if (data && formData.role === 'mentee') {
    const { menteeData } = await supabase
      .from('Mentee')
      .insert({
        user_id: data.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        college: formData.college,
        interests: formData.interests
      })
      .select()

    if (menteeData) console.log({ menteeData })
  }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  return data ? data : error
}
