import { useForm } from '@mantine/form'
import { signIn } from '../../services/Auth'
import { Button, Card, SimpleGrid, TextInput, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
const SignIn = () => {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    }

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const result = await signIn(values)
        if (result) {
          navigate('/dashboard')
        }
      })}
    >
      <Card shadow="sm" radius={0} p={30} maw={720} m="auto">
        <Title order={2} ta="center" mt="md" mb={50}>
          Sign In
        </Title>

        <SimpleGrid cols={2}>
          <TextInput
            label="Email"
            placeholder="james@mentorme.com"
            {...form.getInputProps('email')}
            size="md"
          />
          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            {...form.getInputProps('password')}
            size="md"
          />
        </SimpleGrid>

        <Button fullWidth mt="xl" size="md" type="submit">
          Submit
        </Button>
      </Card>
    </form>
  )
}

export default SignIn
