import { Flex, Grid, Stack, Text } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import RevenueCard from '../../components/dashboard/RevenueCard'

const HomeMentor = () => {
  return (
    <DashboardLayout title="Home">
      <Flex justify="space-between" align="center">
        <Stack>
          <Text>Upcoming Bookings</Text>
          <UpcomingMeetingCard
            firstName="Kyra"
            lastName="Chang"
            title="Esoft"
            time="2023-07-19T18:30:00+00:00"
          />
        </Stack>
        <Stack>
          <Text>Total Revenue</Text>
          <RevenueCard amount="10,000" />
        </Stack>
      </Flex>
    </DashboardLayout>
  )
}

export default HomeMentor
