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

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      email: ''
    },
    validateInputOnBlur: true,
    validate: {
      email: (value) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email'
    }
  })
  const { classes } = useStyles()

  const submitForm = async (e) => {
    e.preventDefault()
    if (!form.isValid()) return
    setLoading(true)

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      form.values.email,
      {
        redirectTo: 'http://localhost:5173/reset-password'
      }
    )

    if (data) {
      console.log(data)
      notifications.show({
        title: 'Reset Link Sent',
        message: 'Please check your email for the reset link',
        color: 'green'
      })
      setLoading(false)
      return
    }

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
              label="Email"
              placeholder="Email"
              type="email"
              {...form.getInputProps('email')}
            />
            <PrimaryButton
              text="Send Reset Link"
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

export default ForgotPassword
