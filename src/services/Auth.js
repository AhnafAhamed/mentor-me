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

  if (error) {
    return error.message
  }

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
  } else if (data && formData.role === 'mentor') {
    const { mentorData } = await supabase
      .from('Mentor')
      .insert({
        user_uid: data.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        workplace: formData.workPlace,
        expertise: formData.expertise,
        job_title: formData.jobTitle,
        experience: formData.experience
      })
      .select()
  }
  return data ? data : error
}

export const signIn = async (formData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (
    error &&
    error.status === 400 &&
    error.message === 'Invalid login credentials'
  ) {
    return error.message
  } else if (
    error &&
    error.status === 400 &&
    error.message === 'Email not confirmed'
  ) {
    return error.message
  }

  if (data) {
    return data
  }
}
