import { Flex, TextInput } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IconSearch from '../../components/icons/IconSearch'
import ProfileCard from '../../components/global/ProfileCard'
import supabase from '../../config/SupabaseClient'
import { useEffect, useState } from 'react'

const Home = () => {
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

  useEffect(() => {
    fetchMentors()
  }, [])
  return (
    <DashboardLayout title="Home">
      <TextInput
        placeholder="Search for Mentors"
        icon={<IconSearch />}
        maw={400}
        mb={48}
      />
      <Flex gap={35} justify="center">
        {mentors.map((mentor) => (
          <ProfileCard
            key={mentor.id}
            name={mentor.first_name + ' ' + mentor.last_name}
            experience={mentor.experience}
            jobTitle={mentor.job_title}
            rating={Math.floor(Math.random() * 5) + 1}
            company={mentor.workplace}
          />
        ))}
      </Flex>
    </DashboardLayout>
  )
}

export default Home
