import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import supabase from '../../config/SupabaseClient'
import { Flex, TextInput } from '@mantine/core'
import ProfileCard from '../../components/global/ProfileCard'
import IconSearch from '../../components/icons/IconSearch'

const Mentors = () => {
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
    <DashboardLayout title="Mentors">
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
            id={mentor.user_uid}
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

export default Mentors