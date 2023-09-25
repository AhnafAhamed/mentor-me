import { Flex, Tabs, Text } from '@mantine/core'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useMenteeBooking from '../../hooks/useMenteeBooking'
import CustomLoader from '../../components/global/CustomLoader'

const BookingsMentee = () => {
  const { upcomingBookings, pastBookings, pendingBookings } = useMenteeBooking()

  return (
    <DashboardLayout title="Bookings">
      <Tabs defaultValue="first">
        <Tabs.List position="center" mb={48}>
          <Tabs.Tab value="first">Pending</Tabs.Tab>
          <Tabs.Tab value="second">Upcoming</Tabs.Tab>
          <Tabs.Tab value="third">Past</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first">
          {pendingBookings ? (
            <Flex gap="sm" wrap="wrap" justify="center" mt={48}>
              {pendingBookings.map((booking) => {
                return (
                  <UpcomingMeetingCard
                    key={booking.id}
                    firstName={booking.Mentor.first_name}
                    lastName={booking.Mentor.last_name}
                    title={booking.Mentor.workplace}
                    time={booking.meeting_time}
                  />
                )
              })}
            </Flex>
          ) : (
            <CustomLoader />
          )}
          {pendingBookings?.length === 0 && <Text>No pending bookings</Text>}
        </Tabs.Panel>

        <Tabs.Panel value="second">
          {upcomingBookings ? (
            <Flex gap="sm" wrap="wrap" justify="center" mt={48}>
              {upcomingBookings.map((booking) => {
                return (
                  <UpcomingMeetingCard
                    key={booking.id}
                    firstName={booking.Mentor.first_name}
                    lastName={booking.Mentor.last_name}
                    title={booking.Mentor.workplace}
                    time={booking.meeting_time}
                    meetingLink={booking.meeting_link}
                  />
                )
              })}
            </Flex>
          ) : (
            <CustomLoader />
          )}
          {upcomingBookings?.length === 0 && (
            <Text align="center">No upcoming bookings</Text>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="third">
          {pastBookings ? (
            <Flex gap="sm" wrap="wrap" justify="center" mt={48}>
              {pastBookings.map((booking) => {
                return (
                  <UpcomingMeetingCard
                    key={booking.id}
                    firstName={booking.Mentor.first_name}
                    lastName={booking.Mentor.last_name}
                    title={booking.Mentor.workplace}
                    time={booking.meeting_time}
                  />
                )
              })}
            </Flex>
          ) : (
            <CustomLoader />
          )}
          {pastBookings?.length === 0 && (
            <Text align="center">No upcoming bookings</Text>
          )}
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  )
}

export default BookingsMentee
