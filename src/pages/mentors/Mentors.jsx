import DashboardLayout from '../../components/layouts/DashboardLayout'
import { Flex, TextInput } from '@mantine/core'
import ProfileCard from '../../components/global/ProfileCard'
import IconSearch from '../../components/icons/IconSearch'
import useSupabase from '../../hooks/useSupabase'
import { getMentors } from '../../services/Mentor'
import CustomLoader from '../../components/global/CustomLoader'

const Mentors = () => {
  const { data: mentors } = useSupabase(getMentors)
  return (
    <DashboardLayout title="Mentors">
      <TextInput
        placeholder="Search for Mentors"
        icon={<IconSearch />}
        maw={400}
        mb={48}
      />
      <Flex gap={35} justify="center" wrap="wrap">
        {mentors ? (
          mentors?.map((mentor) => (
            <ProfileCard
              key={mentor.id}
              id={mentor.id}
              name={mentor.first_name + ' ' + mentor.last_name}
              experience={mentor.experience}
              jobTitle={mentor.job_title}
              rating={Math.floor(Math.random() * 5) + 1}
              company={mentor.workplace}
              image={mentor.image}
              fee={mentor.fee}
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
