import { Flex, SimpleGrid, Text, createStyles } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ProfileCard from '../../components/global/ProfileCard'
import supabase from '../../config/SupabaseClient'
import { useEffect, useState } from 'react'
import TipCard from '../../components/dashboard/TipCard'
import SuccessStories from '../../components/dashboard/SuccessStories'

const useStyles = createStyles((theme) => ({
  flexItem: {
    width: '50%'
  }
}))

const HomeMentee = () => {
  const [mentors, setMentors] = useState([])
  const fetchMentors = async () => {
    const { data, error } = await supabase.from('Mentor').select()
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      setMentors(data)
    }
  }

  const { classes } = useStyles()

  useEffect(() => {
    fetchMentors()
  }, [])

  return (
    <DashboardLayout title="Home">
      <Text size="lg" mb={32} weight={500}>
        {' '}
        ⚡Top Rated Mentors
      </Text>
      <Flex gap={35} justify="center" wrap="wrap" mb={48}>
        {mentors.slice(0, 4).map((mentor) => (
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
        ))}
      </Flex>
      <SimpleGrid cols={2} spacing={35}>
        <TipCard />
        <SuccessStories />
      </SimpleGrid>
    </DashboardLayout>
  )
}

export default HomeMentee
