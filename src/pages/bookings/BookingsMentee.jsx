import { Flex, Stack, Tabs, Text, Textarea } from '@mantine/core'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useMenteeBooking from '../../hooks/useMenteeBooking'
import CustomLoader from '../../components/global/CustomLoader'
import Popup from '../../components/global/Popup'
import { useDisclosure } from '@mantine/hooks'
import RatingStrip from '../../components/global/RatingStrip'
import PrimaryButton from '../../components/global/PrimaryButton'
import { useEffect, useState } from 'react'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'
import { addReview } from '../../services/Review'
import { useForm } from '@mantine/form'
import useUserStore from '../../store/userStore'
import { notifications } from '@mantine/notifications'

const BookingsMentee = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [rating, setRating] = useState(0)
  const { confirmedBookings, completedBookings, pendingBookings } =
    useMenteeBooking()

  const { user } = useUserStore()

  const handleRatingPopupClick = (id) => () => {
    const booking = completedBookings.find((booking) => booking.id === id)
    form.setValues({
      review_by: user.id,
      reviewed_mentor: booking.booked_mentor_id
    })
    open()
  }

  const handleRating = (rating) => {
    setRating(rating + 1)
    form.setValues({ rating: rating + 1 })
  }

  const {
    callService: addReviewService,
    loading: addReviewLoading,
    data: addReviewData
  } = useSuapbaseWithCallback(addReview)

  const handleSubmit = async () => {
    await addReviewService({
      rating: form.values.rating,
      review: form.values.review,
      review_by: form.values.review_by,
      reviewed_mentor: form.values.reviewed_mentor
    })
  }

  const form = useForm({
    initialValues: {
      review: '',
      rating: 0,
      review_by: null,
      reviewed_mentor: null
    },
    validateInputOnBlur: true,
    validate: {
      review: (value) => (value ? null : 'Review is required'),
      rating: (value) => (value ? null : 'Rating is required')
    }
  })

  useEffect(() => {
    if (addReviewData) {
      close()
      notifications.show({
        title: 'Review Added',
        message: 'Your review has been added successfully',
        color: 'green'
      })
    }
  }, [addReviewData])

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
          {confirmedBookings ? (
            <Flex gap="sm" wrap="wrap" justify="center" mt={48}>
              {confirmedBookings.map((booking) => {
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
          {confirmedBookings?.length === 0 && (
            <Text align="center">No upcoming bookings</Text>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="third">
          {completedBookings ? (
            <Flex gap="sm" wrap="wrap" justify="center" mt={48}>
              {completedBookings.map((booking) => {
                return (
                  <UpcomingMeetingCard
                    key={booking.id}
                    firstName={booking.Mentor.first_name}
                    lastName={booking.Mentor.last_name}
                    title={booking.Mentor.workplace}
                    time={booking.meeting_time}
                    isMeetingDone={true}
                    ratingClick={handleRatingPopupClick(booking.id)}
                  />
                )
              })}
            </Flex>
          ) : (
            <CustomLoader />
          )}
          {completedBookings?.length === 0 && (
            <Text align="center">No upcoming bookings</Text>
          )}
        </Tabs.Panel>
      </Tabs>
      <Popup title="How was your experince?" isOpen={opened} isClosed={close}>
        <form onSubmit={handleSubmit}>
          <Stack align="center">
            <RatingStrip
              rating={rating}
              getRating={handleRating}
              isEditable={true}
              {...form.getInputProps('rating')}
            />
            <Textarea
              w="100%"
              minRows={4}
              placeholder="Share your experience with this mentor!"
              {...form.getInputProps('review')}
            />
            <PrimaryButton
              text="Submit"
              disabled={!form.isValid() || addReviewLoading}
              onClick={handleSubmit}
              loading={addReviewLoading}
            >
              Submit
            </PrimaryButton>
          </Stack>
        </form>
      </Popup>
    </DashboardLayout>
  )
}

export default BookingsMentee
