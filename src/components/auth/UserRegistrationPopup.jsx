import { useForm } from '@mantine/form'
import Popup from '../global/Popup'
import {
  Box,
  Button,
  MultiSelect,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  useMantineTheme
} from '@mantine/core'
import PrimaryButton from '../global/PrimaryButton'
import { useEffect, useState } from 'react'
import { signUp } from '../../services/Auth'

const UserRegistrationPopup = ({ title, isOpen, isClosed, role }) => {
  const theme = useMantineTheme()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      firstName: '',
      lastName: '',
      gender: '',
      age: null,
      college: '',
      workPlace: '',
      interests: [],
      expertise: [],
      jobTitle: '',
      experience: null
    },
    validateInputOnBlur: true,
    validate: {
      email: (value) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email',
      //password should be 8 characters
      password: (value) =>
        value.length < 8 ? 'Password should be 8 characters' : null,
      confirmPassword: (value, values) => {
        if (!value || !values.password) return 'Password is required'
        if (value !== values.password) return 'Passwords do not match'
      },
      firstName: (value) => (value ? null : 'First Name is required'),
      lastName: (value) => (value ? null : 'Last Name is required'),
      age: (value) => (value ? null : 'Age is required'),
      gender: (value) => (value ? null : 'Age is required'),
      college: (value) => (value ? null : 'College is required'),
      workPlace: (value) => (value ? null : 'WorkPlace is required'),
      jobTitle: (value) => (value ? null : 'Job Title is required'),
      experience: (value) => (value ? null : 'Experience is required'),
      interests: (value) => (value.length > 0 ? null : 'Interests is required'),
      expertise: (value) => (value.length > 0 ? null : 'Expertise is required')
    }
  })

  form.values.role = role

  const [currentStep, setCurrentStep] = useState(1)
  const [status, setStatus] = useState(false)

  const next = () => {
    setCurrentStep(currentStep + 1) // Increment the current step by 1
  }

  const back = () => {
    setCurrentStep(currentStep - 1) // Increment the current step by 1
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const result = await signUp(form.values)
    if (result.user) {
      setStatus(true)

      setTimeout(() => {
        isClosed()

        setStatus(false)
        form.reset()
      }, 500)
    }
  }

  useEffect(() => {
    form.reset()
    setCurrentStep(1)
  }, [isOpen])

  return (
    <Popup
      title={status ? 'Congratulations!' : title}
      showLogo={currentStep === 1 ? true : false}
      showBackButton={currentStep === 2 ? true : false}
      isOpen={isOpen}
      isClosed={isClosed}
      backClick={back}
    >
      <form onSubmit={submitForm}>
        {currentStep === 1 && !status ? (
          <Stack spacing={24}>
            <TextInput
              label="Email"
              placeholder="Email"
              type="text"
              {...form.getInputProps('email')}
            />

            <SimpleGrid cols={2} breakpoints={[{ maxWidth: '62rem', cols: 1 }]}>
              <TextInput
                label="Password"
                placeholder="Password"
                type="password"
                {...form.getInputProps('password')}
              />
              <TextInput
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                {...form.getInputProps('confirmPassword')}
              />
            </SimpleGrid>
            <Text ta="center" size="sm" color={theme.colors.darkGray[0]}>
              Step 1 of 2
            </Text>
            <Box>
              <PrimaryButton
                onClick={next}
                text="Continue"
                disabled={
                  !form.isValid('email') ||
                  !form.isValid('confirmPassword') ||
                  !form.isValid('password')
                }
              />
            </Box>
          </Stack>
        ) : null}
        {currentStep === 2 && !status ? (
          <Stack spacing={24}>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: '62rem', cols: 1 }]}>
              <TextInput
                label="First Name"
                placeholder="First Name"
                type="text"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                type="text"
                {...form.getInputProps('lastName')}
              />
            </SimpleGrid>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: '62rem', cols: 1 }]}>
              <TextInput
                label="Age"
                placeholder="Age"
                type="number"
                {...form.getInputProps('age')}
              />
              <Select
                label="Gender"
                placeholder="Gender"
                type="text"
                data={[
                  { value: 'male', label: 'Male' },

                  { value: 'female', label: 'Female' }
                ]}
                {...form.getInputProps('gender')}
              />
            </SimpleGrid>
            {role === 'mentor' ? (
              <SimpleGrid
                cols={2}
                breakpoints={[{ maxWidth: '62rem', cols: 1 }]}
              >
                <TextInput
                  label="WorkPlace"
                  placeholder="WorkPlace"
                  type="text"
                  {...form.getInputProps('workPlace')}
                />
                <TextInput
                  label="Job Title"
                  placeholder="Job Title"
                  type="text"
                  {...form.getInputProps('jobTitle')}
                />
              </SimpleGrid>
            ) : null}
            {role === 'mentee' ? (
              <SimpleGrid cols={1}>
                <TextInput
                  label="College/Institution"
                  placeholder="College/Institution"
                  type="text"
                  {...form.getInputProps('college')}
                />
                <MultiSelect
                  label="Interests"
                  placeholder="Interests"
                  data={[
                    {
                      value: 'Full Stack Development',
                      label: 'Full Stack Development'
                    },
                    {
                      value: 'Frontend Development',
                      label: 'Frontend Development'
                    }
                  ]}
                  {...form.getInputProps('interests')}
                />
              </SimpleGrid>
            ) : null}
            {role === 'mentor' ? (
              <SimpleGrid cols={1}>
                <TextInput
                  label="Years of Experience"
                  placeholder="Years of Experience"
                  type="text"
                  {...form.getInputProps('experience')}
                />
                <MultiSelect
                  label="Expertise"
                  placeholder="Expertise"
                  data={[
                    {
                      value: 'Product Management',
                      label: 'Product Management'
                    },
                    {
                      value: 'Business Intelligence',
                      label: 'Business Intelligence'
                    },
                    { value: 'Design Systems', label: 'Design Systems' }
                  ]}
                  {...form.getInputProps('expertise')}
                />
              </SimpleGrid>
            ) : null}
            <Text ta="center" size="sm" color={theme.colors.darkGray[0]}>
              Step 2 of 2
            </Text>
            <PrimaryButton
              text="Create Account"
              type="submit"
              disabled={
                role === 'mentor'
                  ? !form.isValid('firstName') ||
                    !form.isValid('lastName') ||
                    !form.isValid('age') ||
                    !form.isValid('gender') ||
                    !form.isValid('workPlace') ||
                    !form.isValid('jobTitle') ||
                    !form.isValid('experience') ||
                    !form.isValid('expertise')
                  : !form.isValid('firstName') ||
                    !form.isValid('lastName') ||
                    !form.isValid('age') ||
                    !form.isValid('gender') ||
                    !form.isValid('college') ||
                    !form.isValid('interests')
              }
            />
          </Stack>
        ) : null}
        {status ? (
          <Text ta="center" size="md">
            Your account has been successfully created.
            <br /> Welcome to our community!
          </Text>
        ) : null}
      </form>
    </Popup>
  )
}

export default UserRegistrationPopup
