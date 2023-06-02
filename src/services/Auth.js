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
        user_uid: data.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        college: formData.college,
        interests: formData.interests
      })
      .select()

    if (menteeData) console.log({ menteeData })
  } else if (data && formData.role === 'mentor') {
    console.log({ id: data.user.id })
    const { mentorData } = await supabase
      .from('Mentor')
      .insert({
        user_uid: data.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        workplace: formData.workplace,
        expertise: formData.expertise,
        job_title: formData.jobTitle,
        experience: formData.experience
      })
      .select()
    if (mentorData) console.log({ mentorData })
  }
}

export const signIn = async (formData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (data) {
    sessionStorage.setItem('token', JSON.stringify(data))
  }

  return data ? data : error
}
