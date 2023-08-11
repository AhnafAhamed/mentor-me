import { SimpleGrid, TextInput } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IconSearch from '../../components/icons/IconSearch'
import ProfileCard from '../../components/global/ProfileCard'
import supabase from '../../config/SupabaseClient'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    fetchMentors()
  }, [])
  return (
    <DashboardLayout title="Home">
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'xl', cols: 3, spacing: 'md' },
          { maxWidth: 'md', cols: 3, spacing: 'sm' },
          { maxWidth: 'sm', cols: 2, spacing: 'xs' },
          { maxWidth: 'xs', cols: 1, spacing: 'xs' }
        ]}
      >
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
      </SimpleGrid>
    </DashboardLayout>
  )
}

export default HomeMentee
