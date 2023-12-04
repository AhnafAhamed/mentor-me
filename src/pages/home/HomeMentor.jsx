import { Flex, Stack, Text, createStyles } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import StatCard from '../../components/dashboard/StatCard'
import useUserStore from '../../store/userStore'
import { useEffect, useState } from 'react'
import useMentorBooking from '../../hooks/useMentorBooking'
import useReview from '../../hooks/useReview'
import { getMentor } from '../../services/Mentor'
import useSupabase from '../../hooks/useSupabase'

const useStyles = createStyles((theme) => ({
  bookingListWrapper: {
    flex: 1
  }
}))

const HomeMentor = () => {
  const [rating, setRating] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const { user } = useUserStore()
  const { completedBookings, confirmedBookings, pendingBookings } =
    useMentorBooking()
  const { mentorReviews } = useReview(user?.id)
  const { data: mentor } = useSupabase(getMentor.bind(this, user?.id))
  const { classes } = useStyles()

  useEffect(() => {
    if (mentor && mentor[0]) {
      setRevenue(mentor[0].revenue)
    }
  }, [mentor])
  useEffect(() => {
    if (mentorReviews?.length > 0) {
      const sum = mentorReviews.reduce((acc, review) => acc + review.rating, 0)
      setRating(sum / mentorReviews.length)
    }
  }, [mentorReviews])

  useEffect(() => {
    if (confirmedBookings?.length > 0) {
      console.log({ confirmedBookings })
      const upcoming = confirmedBookings.filter(
        (booking) => new Date(booking.meeting_time) > new Date()
      )
      setUpcomingBookings(upcoming)
    }
  }, [confirmedBookings])

  useEffect(() => {}, [pendingBookings])
  return (
    <DashboardLayout title="Home">
      <Text size="xl" mb={32}>
        Welcome Back, {user?.first_name} 👋
      </Text>
      <Flex gap={35} wrap="wrap" mb={48}>
        <StatCard title="Total Revenue" icon="💵" stat={user?.revenue} />
        <StatCard
          title="Total Bookings"
          stat={completedBookings?.length}
          icon="🎟️"
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
          stat={`${rating}/5`}
          isCurrency={false}
        />
      </Flex>
      <Flex justify="space-between">
        <Stack className={classes.bookingListWrapper}>
          <Text size="xl" weight={500}>
            Upcoming Bookings
          </Text>
          {upcomingBookings?.length === 0 ? (
            <Text size="sm" color="gray">
              No upcoming bookings
            </Text>
          ) : (
            <Flex gap={35}>
              {upcomingBookings.map((booking) => (
                <UpcomingMeetingCard
                  key={booking.id}
                  firstName={booking.Mentee.first_name}
                  lastName={booking.Mentee.last_name}
                  title={booking.Mentee.college}
                  time={booking.meeting_time}
                  meetingLink={booking.meeting_link}
                />
              ))}
            </Flex>
          )}
        </Stack>
        <Stack className={classes.bookingListWrapper}>
          <Text size="xl" weight={500}>
            Pending Bookings
          </Text>
          {pendingBookings?.length === 0 ? (
            <Text size="sm" color="gray">
              No upcoming bookings
            </Text>
          ) : (
            <Flex gap={35}>
              {pendingBookings?.map((booking) => (
                <UpcomingMeetingCard
                  key={booking.id}
                  firstName={booking.Mentee.first_name}
                  lastName={booking.Mentee.last_name}
                  title={booking.Mentee.college}
                  time={booking.meeting_time}
                  confirmClick={() => console.log('confirm')}
                  showButtons
                />
              ))}
            </Flex>
          )}
        </Stack>
      </Flex>
    </DashboardLayout>
  )
}

export default HomeMentor
