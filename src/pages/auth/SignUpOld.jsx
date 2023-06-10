import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Card,
  Select,
  SimpleGrid,
  MultiSelect
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { signUp } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])

  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      role: '',
      firstName: '',
      lastName: '',
      gender: '',
      age: 0,
      college: '',
      workPlace: '',
      interests: [],
      expertise: [],
      jobTitle: '',
      experience: 0
    }

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })

  const next = () => {
    setCurrentStep(currentStep + 1) // Increment the current step by 1
  }
  return (
    <form onSubmit={form.onSubmit((values) => signUp(values))}>
      {currentStep === 1 && (
        <Card shadow="sm" radius={0} p={30} maw={720} m="auto">
          <Title order={2} ta="center" mt="md" mb={50}>
            Create your Account
          </Title>

          <TextInput
            label="Email address"
            type="email"
            placeholder="hello@gmail.com"
            {...form.getInputProps('email')}
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            mt="md"
            size="md"
          />
          <Button fullWidth mt="xl" size="md" onClick={next}>
            Next
          </Button>
        </Card>
      )}
      {currentStep === 2 && (
        <Card shadow="sm" radius={0} p={30} maw={720} m="auto">
          <Title order={2} ta="center" mt="md" mb={50}>
            Select your role
          </Title>
          <Select
            label="Email address"
            placeholder="hello@gmail.com"
            data={[
              { value: 'mentor', label: 'Mentor' },
              { value: 'mentee', label: 'Mentee' }
            ]}
            {...form.getInputProps('role', { type: 'select' })}
            size="md"
          />
          <Button fullWidth mt="xl" size="md" onClick={next}>
            Next
          </Button>
        </Card>
      )}
      {currentStep === 3 && (
        <Card shadow="sm" radius={0} p={30} maw={720} m="auto">
          <Title order={2} ta="center" mt="md" mb={50}>
            Profile Details
          </Title>

          <SimpleGrid cols={2}>
            <TextInput
              label="First Name"
              placeholder="James"
              {...form.getInputProps('firstName')}
              size="md"
            />
            <TextInput
              label="Last Name"
              placeholder="Cameroon"
              {...form.getInputProps('lastName')}
              size="md"
            />
            <Select
              label="Gender"
              placeholder="Select your gender"
              data={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
              ]}
              {...form.getInputProps('gender', { type: 'select' })}
              size="md"
            />
            <TextInput
              label="Age"
              placeholder="age"
              type="number"
              {...form.getInputProps('age')}
              size="md"
            />
            {form.values.role === 'mentee' ? (
              <TextInput
                label="College/Institution"
                placeholder="College/Institution"
                {...form.getInputProps('college')}
                size="md"
              />
            ) : (
              <TextInput
                label="WorkPlace"
                placeholder="WorkPlace"
                {...form.getInputProps('workPlace')}
                size="md"
              />
            )}
            {form.values.role === 'mentee' ? (
              <MultiSelect
                label="Interests"
                placeholder="Select your interests"
                data={[
                  { value: 'frontend', label: 'FrontEnd' },
                  { value: 'backend', label: 'Backend' },
                  { value: 'fullstack', label: 'Full Stack' },
                  { value: 'ba', label: 'Business Analyst' }
                ]}
                {...form.getInputProps('interests', { type: 'multiSelect' })}
                size="md"
              />
            ) : (
              <MultiSelect
                label="Expertise"
                placeholder="Select your expetise"
                data={[
                  { value: 'frontend', label: 'FrontEnd' },
                  { value: 'backend', label: 'Backend' },
                  { value: 'fullstack', label: 'Full Stack' },
                  { value: 'ba', label: 'Business Analyst' }
                ]}
                {...form.getInputProps('expertise', { type: 'multiSelect' })}
                size="md"
              />
            )}
            {form.values.role === 'mentor' ? (
              <TextInput
                label="Job Title"
                placeholder="Job Title"
                {...form.getInputProps('jobTitle')}
                size="md"
              />
            ) : null}
            {form.values.role === 'mentor' ? (
              <TextInput
                label="Experience"
                placeholder="Experience"
                type="number"
                {...form.getInputProps('experience')}
                size="md"
              />
            ) : null}
          </SimpleGrid>

          <Button fullWidth mt="xl" size="md" type="submit">
            Submit
          </Button>
        </Card>
      )}
    </form>
  )
}

export default SignUp
