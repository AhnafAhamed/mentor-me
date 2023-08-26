import { Flex, SimpleGrid, Text, createStyles } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ProfileCard from '../../components/global/ProfileCard'
import TipCard from '../../components/dashboard/TipCard'
import SuccessStories from '../../components/dashboard/SuccessStories'
import useSupabase from '../../hooks/useSupabase'
import { getMentors } from '../../services/Mentor'
import CustomLoader from '../../components/global/CustomLoader'

const HomeMentee = () => {
  const {
    loading: mentorsLoading,
    data: mentors,
    error: reviewsError,
    getData: getNewReviews
  } = useSupabase(getMentors)

  return (
    <DashboardLayout title="Home">
      <Text size="lg" mb={32} weight={500}>
        {' '}
        ⚡Top Rated Mentors
      </Text>
      <Flex gap={35} justify="center" wrap="wrap" mb={48}>
        {mentors ? (
          mentors
            .slice(0, 4)
            .map((mentor) => (
              <ProfileCard
                key={mentor.id}
                id={mentor.user_uid}
                image={mentor.image}
                name={mentor.first_name + ' ' + mentor.last_name}
                experience={mentor.experience}
                jobTitle={mentor.job_title}
                rating={Math.floor(Math.random() * 5) + 1}
                company={mentor.workplace}
              />
            ))
        ) : (
          <CustomLoader />
        )}
      </Flex>
      <SimpleGrid cols={2} spacing={35}>
        <TipCard />
        <SuccessStories />
      </SimpleGrid>
    </DashboardLayout>
  )
}

export default HomeMentee
