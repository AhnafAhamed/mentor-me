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
  console.log({ data, formData })
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
        age: formData.age,
        gender: formData.gender,
        workplace: formData.workPlace,
        expertise: formData.expertise,
        job_title: formData.jobTitle,
        experience: formData.experience
      })
      .select()
    if (mentorData) console.log({ mentorData })
  }

  return data ? data : error
}

export const signIn = async (formData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error && error.status === 400) {
    return 'invalid credentials'
  }

  if (data) {
    return data
  }
}
