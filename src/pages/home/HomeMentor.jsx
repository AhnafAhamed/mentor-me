import { Flex, Stack, Text } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import StatCard from '../../components/dashboard/StatCard'

const HomeMentor = () => {
  return (
    <DashboardLayout title="Home">
      <Text size="xl" mb={32}>
        Welcome Back, John 👋
      </Text>
      <Flex gap={35} wrap="wrap" mb={48}>
        <StatCard title="Total Revenue" icon="💵" stat="200,000/=" />
        <StatCard
          title="Total Bookings"
          icon="🎟️"
          stat={200}
          isCurrency={false}
        />
        <StatCard
          title="Profile Views"
          icon="👀"
          stat={344}
          isCurrency={false}
        />
        <StatCard
          title="Overall Rating"
          icon="⭐"
          stat="4.5/5"
          isCurrency={false}
        />
      </Flex>
      <Flex align="center">
        <Stack>
          <Text size="xl" weight={500}>
            Upcoming Bookings
          </Text>
          <UpcomingMeetingCard
            firstName="Kyra"
            lastName="Chang"
            title="Esoft"
            time="2023-07-19T18:30:00+00:00"
            meetingLink="lll"
          />
        </Stack>
      </Flex>
    </DashboardLayout>
  )
}

export default HomeMentor
