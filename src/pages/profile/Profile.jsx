import {
  Container,
  MultiSelect,
  Select,
  Stack,
  Tabs,
  TextInput
} from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useForm } from '@mantine/form'
import useUserStore from '../../store/userStore'
import PrimaryButton from '../../components/global/PrimaryButton'
import { getMentee, updateMentee } from '../../services/Mentee'
import { getMentor, updateMentor } from '../../services/Mentor'
import { useEffect, useState } from 'react'

const Profile = () => {
  const { user } = useUserStore()
  const [currentUser, setCurrentUser] = useState(null)
  const form = useForm({
    initialValues: {
      first_name: ' ',
      last_name: ' ',
      gender: ' ',
      age: 0,
      college: ' ',
      workPlace: ' ',
      interests: [],
      expertise: [],
      jobTitle: ' ',
      experience: 0
    }
  })

  const submitForm = async (e) => {
    e.preventDefault()
    if (user.user_metadata.role === 'mentee') {
      const {
        jobTitle,
        experience,
        workPlace,
        expertise,
        user_uid,
        created_at,
        updated_at,
        id,
        ...updatedFormValues
      } = form.values
      const result = await updateMentee(user.user_uid, updatedFormValues)
      console.log({ result })
    } else if (user_metadata.role === 'mentor') {
      const {
        college,
        interests,
        user_uid,
        created_at,
        updated_at,
        id,
        ...updatedFormValues
      } = form.values
      const result = await updateMentor(user.user_uid, updatedFormValues)
      console.log({ result })
    }
  }

  useEffect(() => {
    const initUser = async () => {
      if (user.user_metadata.role === 'mentee') {
        const result = await getMentee(user.user_uid)
        form.setValues(result[0])
      } else if (user.user_metadata.role === 'mentor') {
        const result = await getMentor(user.user_uid)
        form.setValues(result[0])
      }
    }
    initUser()
  }, [])
  return (
    <DashboardLayout title="Profile">
      <Stack spacing={32}>
        <Tabs defaultValue="first">
          <Tabs.List position="center">
            <Tabs.Tab value="first">Mentee Profile</Tabs.Tab>
            <Tabs.Tab value="second">Settings</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Container size={400} w="100%">
          <form onSubmit={submitForm}>
            <Stack spacing="24px">
              <TextInput
                label="First Name"
                placeholder="First Name"
                type="text"
                {...form.getInputProps('first_name')}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                type="text"
                {...form.getInputProps('last_name')}
              />
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
              {user.user_metadata.role === 'mentor' ? (
                <>
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
                </>
              ) : null}
              {user.user_metadata.role === 'mentee' ? (
                <>
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
                      },
                      {
                        value: 'ba',
                        label: 'Business Analyst'
                      }
                    ]}
                    {...form.getInputProps('interests')}
                  />
                </>
              ) : null}
              {user.user_metadata.role === 'mentor' ? (
                <>
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
                </>
              ) : null}
              <PrimaryButton text="Update" type="submit" />
            </Stack>
          </form>
        </Container>
      </Stack>
    </DashboardLayout>
  )
}

export default Profile
