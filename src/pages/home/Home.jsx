import { Flex, TextInput } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IconSearch from '../../components/icons/IconSearch'
import ProfileCard from '../../components/global/ProfileCard'
import ProfileOne from '../../assets/images/profile-1.jpg'

const Home = () => {
  return (
    <DashboardLayout title="Home">
      <TextInput
        placeholder="Search for Mentors"
        icon={<IconSearch />}
        maw={400}
      />
      <Flex>
        <ProfileCard
          name="Ahnaf Ahamed"
          experience="7"
          jobTitle="Product Manager"
          rating="4.5"
          company="Google"
          image={ProfileOne}
        />
      </Flex>
    </DashboardLayout>
  )
}

export default Home
