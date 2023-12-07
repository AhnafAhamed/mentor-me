import { useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserStore from '../../store/userStore'
import useReview from '../../hooks/useReview'
import ReviewCard from '../../components/global/ReviewCard'
import { Carousel } from '@mantine/carousel'
import { Flex, Title, createStyles } from '@mantine/core'
import StatCard from '../../components/dashboard/StatCard'
import useMentorBooking from '../../hooks/useMentorBooking'

const useStyles = createStyles((theme) => ({
  emptyCard: {
    borderRadius: '12px',
    backgroundColor: theme.colors.lightPurple[0],
    padding: '32px',
    textAlign: 'center'
  }
}))

const Stats = () => {
  const { user } = useUserStore()
  const { mentorReviews } = useReview(user?.id)
  const {
    confirmedBookings,
    pendingBookings,
    completedBookings,
    getNewPendingBookings,
    getNewConfirmedBookings
  } = useMentorBooking()

  const { classes } = useStyles()

  useEffect(() => {
    console.log(mentorReviews)
  }, [mentorReviews])
  return (
    <DashboardLayout title="Your Stats">
      <>
        <Title size="xl" mb={24}>
          Your Reviews
        </Title>
        {mentorReviews?.length != 0 ? (
          <Title size={12} mb={24} className={classes.emptyCard}>
            You have no reviews yet
          </Title>
        ) : (
          <Carousel
            mx="auto"
            loop
            withIndicators={false}
            controlsOffset={4}
            slideSize="100%"
            maw={500}
          >
            {mentorReviews?.map((review) => (
              <Carousel.Slide>
                <ReviewCard
                  key={review.id}
                  firstName={review.Mentee.first_name}
                  lastName={review.Mentee.last_name}
                  title={review.Mentee.college}
                  time={review.meeting_start}
                  rating={review.rating}
                  review={review.review}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </>
      <>
        <Title size="xl" mb={24}>
          Profile Views
        </Title>
        <StatCard
          title="Total Views"
          icon="👀"
          stat={Math.floor(Math.random() * 91) + 10}
          isCurrency={false}
        />
      </>
      <>
        <Title size="xl" mb={24} mt={24}>
          Bookings
        </Title>
        <Flex gap={12}>
          <StatCard
            title="Pending Bookings"
            icon="⚠️"
            stat={pendingBookings?.length}
            isCurrency={false}
          />
          <StatCard
            title="Confirmed Bookings"
            icon="🗓️"
            stat={confirmedBookings?.length}
            isCurrency={false}
          />
          <StatCard
            title="Completed Bookings"
            icon="✅"
            stat={completedBookings?.length}
            isCurrency={false}
          />
        </Flex>
      </>
    </DashboardLayout>
  )
}

export default Stats
