import { Flex, TextInput } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IconSearch from '../../components/icons/IconSearch'
import ProfileCard from '../../components/global/ProfileCard'

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
        />
        <ProfileCard
          name="Shaun Park"
          experience="2"
          jobTitle="Devops Engineer"
          rating="4.2"
          company="MacroActive"
        />
      </Flex>
    </DashboardLayout>
  )
}

export default Home
