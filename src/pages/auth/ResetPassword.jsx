import AuthLayout from '../../components/layouts/AuthLayout'
import CoverImage from '../../assets/images/auth-cover.jpg'
import { useForm } from '@mantine/form'
import supabase from '../../config/SupabaseClient'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { Stack, TextInput, Title, createStyles } from '@mantine/core'
import PrimaryButton from '../../components/global/PrimaryButton'

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignSelf: 'center'
  }
}))

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      password: ''
    },
    validateInputOnBlur: true,
    validate: {
      password: (value) => (value ? null : 'Password is required')
    }
  })
  const { classes } = useStyles()

  const submitForm = async (e) => {
    e.preventDefault()
    if (!form.isValid()) return
    setLoading(true)

    const { data, error } = await supabase.auth.updateUser({
      password: form.values.password
    })

    if (error) {
      console.log(error)
      setLoading(false)
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red'
      })
      return
    }

    if (data) {
      console.log(data)
      notifications.show({
        title: 'Your password has been reset',
        message: 'Please sign in with your new password',
        color: 'green'
      })
      setLoading(false)
      return
    }
  }
  return (
    <AuthLayout image={CoverImage}>
      <Stack spacing={0} mt={120} maw={400} className={classes.wrapper}>
        <Title weight={700} mb={40}>
          Reset Your Password
        </Title>
        <form onSubmit={submitForm}>
          <Stack spacing={24} mb={16}>
            <TextInput
              label="New Password"
              placeholder="New Password"
              type="text"
              {...form.getInputProps('password')}
            />
            <PrimaryButton
              text="Update Password"
              type="submit"
              disabled={!form.isValid()}
              loading={loading}
            />
          </Stack>
        </form>
      </Stack>
    </AuthLayout>
  )
}

export default ResetPassword
