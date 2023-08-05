import AuthLayout from '../../components/layouts/AuthLayout'
import CoverImage from '../../assets/images/auth-cover.jpg'
import {
  Notification,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles
} from '@mantine/core'
import PrimaryButton from '../../components/global/PrimaryButton'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../services/Auth'
import useUserStore from '../../store/userStore'
import { useEffect, useState } from 'react'
import { getMentees } from '../../services/Mentee'
import { getMentors } from '../../services/Mentor'
import { notifications } from '@mantine/notifications'

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignSelf: 'center'
  }
}))

const SigIn = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const { user } = useUserStore()
  const { classes } = useStyles()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validateInputOnBlur: true,
    validate: {
      email: (value) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email',
      password: (value) => (value ? null : 'Password is required')
    }
  })

  const submitForm = async (e) => {
    e.preventDefault()
    if (!form.isValid()) return
    setLoading(true)
    const result = await signIn(form.values)
    if (result === 'invalid credentials') {
      setLoading(false)
      notifications.show({
        title: 'Invalid Credentials',
        message: 'Please check your email and password',
        color: 'red'
      })
    }
    if (result.user) {
      setLoading(false)
      let userData = null
      if (result.user.user_metadata.role === 'mentee') {
        const data = await getMentees()
        userData = data?.find((mentee) => mentee.user_uid === result.user.id)
      } else if (result.user.user_metadata.role === 'mentor') {
        const data = await getMentors()
        userData = data?.find((mentor) => mentor.user_uid === result.user.id)
      }
      setUser({ ...result.user, ...userData })
      navigate('/')
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])
  return (
    <>
      <AuthLayout image={CoverImage}>
        <Stack spacing={0} mt={120} maw={400} className={classes.wrapper}>
          <Title weight={700} mb={40}>
            Welcome Back!
          </Title>
          <form onSubmit={submitForm}>
            <Stack spacing={24} mb={16}>
              <TextInput
                label="Email"
                placeholder="Email"
                type="text"
                {...form.getInputProps('email')}
              />

              <TextInput
                label="Password"
                placeholder="Password"
                type="password"
                {...form.getInputProps('password')}
              />
              <PrimaryButton
                text="Sign In"
                type="submit"
                disabled={!form.isValid()}
                loading={loading}
              />
            </Stack>
          </form>

          <Stack spacing={32}>
            <Link to="/forget-password">
              <Text weight={600} td="underline">
                Forget Password
              </Text>
            </Link>
            <Flex gap={4}>
              <Text>Don't have an account?</Text>
              <Link to="/sign-up">
                <Text weight={600} td="underline">
                  Create Account
                </Text>
              </Link>
            </Flex>
          </Stack>
        </Stack>
      </AuthLayout>
    </>
  )
}

export default SigIn
