import { Flex, Stack, Text } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import StatCard from '../../components/dashboard/StatCard'
import useUserStore from '../../store/userStore'
import { useEffect, useState } from 'react'
import useMentorBooking from '../../hooks/useMentorBooking'
import useReview from '../../hooks/useReview'

const HomeMentor = () => {
  const [rating, setRating] = useState(0)
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const { user } = useUserStore()
  const { completedBookings, confirmedBookings } = useMentorBooking()
  const { mentorReviews } = useReview(user?.id)

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
  return (
    <DashboardLayout title="Home">
      <Text size="xl" mb={32}>
        Welcome Back, John 👋
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
      <Flex align="center">
        <Stack>
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
      </Flex>
    </DashboardLayout>
  )
}

export default HomeMentor
