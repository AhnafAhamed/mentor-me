import { Center, Stack } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { getResources } from '../../services/Resources'
import ResourceCard from '../../components/resources/ResourceCard'
import useSupabase from '../../hooks/useSupabase'
import CustomLoader from '../../components/global/CustomLoader'

const Resources = () => {
  const { data: resources } = useSupabase(getResources)
  return (
    <DashboardLayout title="Resources">
      <Center>
        <Stack>
          {resources ? (
            resources?.map((resource) => (
              <ResourceCard
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
      </Center>
    </DashboardLayout>
  )
}

export default Resources
