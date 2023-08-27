import { Center, Stack, Text, TextInput, createStyles } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useForm } from '@mantine/form'
import PrimaryButton from '../../components/global/PrimaryButton'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'
import { addResource, getMentorResources } from '../../services/Resources'
import useUserStore from '../../store/userStore'
import { notifications } from '@mantine/notifications'
import ResourceCard from '../../components/resources/ResourceCard'
import useSupabase from '../../hooks/useSupabase'
import CustomLoader from '../../components/global/CustomLoader'
import { useEffect } from 'react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderRadius: '16px',
    backgroundColor: '#DDDDDD30',
    padding: '24px'
  }
}))

const ResourcesMentor = () => {
  const { user } = useUserStore()
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      link: ''
    },
    validateInputOnBlur: true,
    validate: {
      title: (value) => (value ? null : 'Title is required'),
      description: (value) => (value ? null : 'Description is required')
    }
  })

  const {
    callService: addResourceService,
    loading: loadingResourceData,
    data: resourceData
  } = useSuapbaseWithCallback(addResource)

  const {
    loading: mentoResourcesLoading,
    data: mentorResources,
    error: mentorResourcesError,
    getData: getMentorResourcesData
  } = useSupabase(getMentorResources.bind(this, user.id))

  useEffect(() => {
    if (!resourceData) return
    getMentorResourcesData()
    notifications.show({
      title: 'Resource Added',
      color: 'green'
    })
    form.reset()
  }, [resourceData])

  const submitForm = async (e) => {
    e.preventDefault()
    await addResourceService({
      posted_by: user.id,
      title: form.values.title,
      description: form.values.description,
      link: form.values.link
    })
  }

  const { classes } = useStyles()
  return (
    <DashboardLayout title="Resources">
      <form onSubmit={submitForm}>
        <Stack className={classes.wrapper} spacing={16} maw={500} m="auto">
          <TextInput
            label="Title"
            placeholder="Enter title"
            type="text"
            {...form.getInputProps('title')}
          ></TextInput>
          <TextInput
            label="Description"
            placeholder="Enter description"
            type="text"
            {...form.getInputProps('description')}
          ></TextInput>
          <TextInput
            label="Link"
            placeholder="Enter link to a resource"
            type="text"
            {...form.getInputProps('link')}
          ></TextInput>
          <PrimaryButton
            type="submit"
            text="Post"
            maw={200}
            mt={8}
            loading={loadingResourceData}
            disabled={!form.isValid('title') || !form.isValid('description')}
          />
        </Stack>
      </form>
      <Center>
        {mentorResources?.length > 0 ? (
          <Stack>
            <Text size="lg" weight="bold" mt={32} align="center">
              Resources shared by You
            </Text>
            <Stack>
              {mentorResources ? (
                mentorResources?.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    firstName={resource.Mentor.first_name}
                    lastName={resource.Mentor.last_name}
                    image={resource.Mentor.image}
                    date={resource.created_at}
                    link={resource.link}
                  />
                ))
              ) : (
                <CustomLoader />
              )}
            </Stack>
          </Stack>
        ) : (
          <Text size="lg" weight="bold" mt={32} align="center">
            No resources shared by you yet
          </Text>
        )}
      </Center>
    </DashboardLayout>
  )
}

export default ResourcesMentor
