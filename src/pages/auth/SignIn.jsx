import AuthLayout from '../../components/layouts/AuthLayout'
import CoverImage from '../../assets/images/auth-cover.jpg'
import {
  Button,
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
import { useEffect } from 'react'

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
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    }

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })

  const submitForm = async (e) => {
    e.preventDefault()
    const result = await signIn(form.values)
    if (result.user) {
      setUser(result.user)
      navigate('/')
    }
  }

  useEffect(() => {
    console.log({ user })
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
                type="text"
                {...form.getInputProps('password')}
              />
              <PrimaryButton text="Sign In" type="submit" />
            </Stack>
          </form>

          <Stack spacing={32}>
            <Link to="/forget-password">
              <Text weight={600} td="underline">
                Sign In
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
