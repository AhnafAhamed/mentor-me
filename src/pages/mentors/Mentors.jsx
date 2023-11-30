import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { Flex, TextInput } from '@mantine/core'
import ProfileCard from '../../components/global/ProfileCard'
import IconSearch from '../../components/icons/IconSearch'
import useSupabase from '../../hooks/useSupabase'
import { getMentors } from '../../services/Mentor'
import CustomLoader from '../../components/global/CustomLoader'

const Mentors = () => {
  const { data: mentors } = useSupabase(getMentors)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <DashboardLayout title="Mentors">
      <TextInput
        placeholder="Search for Mentors"
        icon={<IconSearch />}
        maw={400}
        mb={48}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
      />
      <Flex gap={35} justify="center" wrap="wrap">
        {mentors ? (
          mentors
            .filter((mentor) =>
              (mentor.first_name + ' ' + mentor.last_name)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((mentor) => (
              <ProfileCard
                key={mentor.id}
                id={mentor.id}
                name={mentor.first_name + ' ' + mentor.last_name}
                experience={mentor.experience}
                jobTitle={mentor.job_title}
                rating={Math.floor(Math.random() * 5) + 1}
              />
            ))
        ) : (
          <CustomLoader />
        )}
      </Flex>
    </DashboardLayout>
  )
}

export default Mentors
