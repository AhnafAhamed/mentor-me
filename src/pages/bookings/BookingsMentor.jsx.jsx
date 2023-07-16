import { Tabs } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'

const BookingsMentor = () => {
  return (
    <DashboardLayout title="Bookings">
      <Tabs defaultValue="first">
        <Tabs.List position="center">
          <Tabs.Tab value="first">Upcoming</Tabs.Tab>
          <Tabs.Tab value="second">Pending</Tabs.Tab>
          <Tabs.Tab value="third">Available Slots</Tabs.Tab>
          <Tabs.Tab value="fourth">Past</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <h1>Upcoming</h1>
          <UpcomingMeetingCard />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <h1>Pending</h1>
        </Tabs.Panel>
        <Tabs.Panel value="third">
          <h1>Available Slots</h1>
        </Tabs.Panel>
        <Tabs.Panel value="fourth">
          <h1>Past</h1>
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  )
}

export default BookingsMentor
