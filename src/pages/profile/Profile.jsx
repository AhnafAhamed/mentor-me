import {
  Center,
  Container,
  MultiSelect,
  SimpleGrid,
  Select,
  Stack,
  Tabs,
  TextInput,
  Text,
  Image,
  createStyles,
  Flex,
  Button,
  useMantineTheme
} from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useForm } from '@mantine/form'
import useUserStore from '../../store/userStore'
import PrimaryButton from '../../components/global/PrimaryButton'
import { getMentee, updateMentee } from '../../services/Mentee'
import { getMentor, updateMentor } from '../../services/Mentor'
import { useEffect, useState } from 'react'
import UserProfileCard from '../../components/profile/UserProfileCard'
import Popup from '../../components/global/Popup'
import { useDisclosure } from '@mantine/hooks'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import IconEdit from '../../components/icons/IconEdit'
import supabase from '../../config/SupabaseClient'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'
import { notifications } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { IconLogout, IconRotate } from '@tabler/icons-react'
import AccountDetails from '../../components/profile/AccountDetails'

const useStyles = createStyles((theme) => ({
  dropZone: {
    width: 'max-content',
    margin: 'auto',
    background: 'transparent',
    opacity: 0.6,
    '&:hover': {
      background: 'transparent',
      opacity: 0.5
    }
  },
  dropZoneImage: {
    '&:hover': {
      opacity: 0.5
    }
  },
  dropZoneIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

const Profile = () => {
  const { user } = useUserStore()
  const setUser = useUserStore((state) => state.setUser)
  const [opened, { open, close }] = useDisclosure(false)
  const theme = useMantineTheme()
  const role = user.user_metadata.role
  const {
    callService: updateProfileService,
    loading: updateProfileResponseLoading,
    data: updateProfileServiceResponse
  } = useSuapbaseWithCallback(role === 'mentee' ? updateMentee : updateMentor)
  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      gender: '',
      age: 0,
      college: '',
      workplace: '',
      interests: [],
      expertise: [],
      job_title: '',
      experience: 0,
      image: '',
      linkedin: '',
      introduction: '',
      availability: {}
    }
  })

  const { classes } = useStyles()

  useEffect(() => {
    if (updateProfileServiceResponse) {
      setUser({ ...user, ...updateProfileServiceResponse[0] })
      close()
      notifications.show({
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully',
        color: 'green'
      })
      form.setValues(updateProfileServiceResponse[0])
      //reset updateProfileServiceResponse
    }
  }, [updateProfileServiceResponse])

  const handleImageChange = async (imageFile) => {
    if (imageFile) {
      const randomId = Math.random().toString(36).substring(2)

      const { data: isUploaded, error } = await supabase.storage
        .from('user-avatars')
        .upload(`/${form.values.first_name}-${randomId}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (!isUploaded) return

      const { data: imageLink } = supabase.storage
        .from('user-avatars')
        .getPublicUrl(`/${form.values.first_name}-${randomId}`)
      if (imageLink) {
        form.setValues({ ...form.values, image: imageLink.publicUrl })
      }
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()

    if (user.user_metadata.role === 'mentee') {
      // the updateedFormValues contains the values except for the ones excplicitly mentioned in the destructuring
      const {
        jobTitle,
        experience,
        workplace,
        job_title,
        expertise,
        user_uid,
        created_at,
        updated_at,
        availability,
        linkedin,
        introduction,
        id,
        ...updatedFormValues
      } = form.values
      await updateProfileService(user.user_uid, updatedFormValues)
    } else if (user.user_metadata.role === 'mentor') {
      const {
        college,
        interests,
        user_uid,
        created_at,
        updated_at,
        id,
        ...updatedFormValues
      } = form.values
      await updateProfileService(user.user_uid, updatedFormValues)
    }
  }

  useEffect(() => {
    const initUser = async () => {
      if (user.user_metadata.role === 'mentee') {
        const result = await getMentee(user.user_uid)
        form.setValues(result[0])
      } else if (user.user_metadata.role === 'mentor') {
        const result = await getMentor(user.id)
        form.setValues(result.data[0])
      }
    }
    initUser()
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <DashboardLayout title="Profile">
      <Container maw={720} mx="auto" p={0}>
        <UserProfileCard
          onEditClick={open}
          firstName={form.values.first_name}
          lastName={form.values.last_name}
          title={
            role === 'mentee' ? form.values.college : form.values.workplace
          }
          skills={
            role === 'mentee' ? form.values.interests : form.values.expertise
          }
          avatar={form.values.image}
          experience={form.values.experience}
          workplace={form.values.workplace}
          college={form.values.college}
          age={form.values.age}
        />

        {user?.user_metadata.role === 'mentor' && (
          <AccountDetails user={user} />
        )}
      </Container>
      <Popup title="Edit Profile" isOpen={opened} isClosed={close}>
        <form onSubmit={submitForm}>
          <Stack spacing={24} m={24}>
            <Dropzone
              className={classes.dropZone}
              onDrop={(files) => handleImageChange(files[0])}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              maxFiles={1}
            >
              <Image
                className={classes.dropZoneImage}
                src={form.values.image}
                width={100}
                height={100}
                withPlaceholder
                mx="auto"
                radius="50%"
              ></Image>
              {form.values.image && (
                <div className={classes.dropZoneIcon}>
                  <IconEdit />
                </div>
              )}
            </Dropzone>

            <SimpleGrid cols={2} breakpoints={[{ maxWidth: '62rem', cols: 1 }]}>
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
                  {...form.getInputProps('workplace')}
                />
                <TextInput
                  label="Job Title"
                  placeholder="Job Title"
                  type="text"
                  {...form.getInputProps('job_title')}
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
                    },
                    {
                      value: 'ba',
                      label: 'Business Analyst'
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
            <PrimaryButton
              text="Update Profile"
              type="submit"
              loading={updateProfileResponseLoading}
            />
          </Stack>
        </form>
      </Popup>
    </DashboardLayout>
  )
}

export default Profile
