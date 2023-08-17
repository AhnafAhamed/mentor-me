import {
  Box,
  Center,
  Container,
  Flex,
  Loader,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Tabs,
  Text,
  TextInput,
  useMantineTheme
} from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import { useEffect, useState } from 'react'
import useUserStore from '../../store/userStore'
import Popup from '../../components/global/Popup'
import { useDisclosure } from '@mantine/hooks'
import PrimaryButton from '../../components/global/PrimaryButton'
import IconDone from '../../components/icons/IconDone'
import time from '../../data/time.json'
import { useForm } from '@mantine/form'
import { updateMentor } from '../../services/Mentor'
import { notifications } from '@mantine/notifications'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'
import useMentorBooking from '../../hooks/useMentorBooking'
import { updateBooking } from '../../services/Booking'
import CustomLoader from '../../components/global/CustomLoader'
import ReviewCard from '../../components/global/ReviewCard'
import useReview from '../../hooks/useReview'

const BookingsMentor = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [link, setLink] = useState('')
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const { user } = useUserStore()
  const theme = useMantineTheme()
  const {
    callService: updateAvailabilityService,
    loading: loadingUpdatedMentorData,
    data: updatedMentorData,
    error
  } = useSuapbaseWithCallback(updateMentor)

  const {
    callService: updateBookingService,
    loading: updateBookingLoading,
    data: updateBookingData
  } = useSuapbaseWithCallback(updateBooking)

  const { confirmedBookings, pendingBookings, getNewPendingBookings } =
    useMentorBooking()

  const { reviews } = useReview()

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      weekDayStart: '17',
      weekDayEnd: '22',
      weekEndStart: '8',
      weekEndEnd: '14',
      weekEndAvailable: true,
      weekDayAvailable: true
    },

    validate: {
      weekDayEnd: (value, values) =>
        value < values.weekDayStart ? null : 'Invalid Time'
    }
  })

  useEffect(() => {
    if (updateBookingData) {
      getNewPendingBookings()
      setTimeout(() => {
        close()
        setIsBookingConfirmed(false)
      }, 2000)
    }
  }, [updateBookingData])

  const confirmBooking = async () => {
    await updateBookingService(selectedBooking, 'confirmed', link)
    setIsBookingConfirmed(true)
  }

  const openConfirmPopup = (id) => {
    open()
    setSelectedBooking(id)
  }

  const updateAvailability = async () => {
    await updateAvailabilityService(user.user_uid, {
      availability: form.values
    })

    if (updatedMentorData) {
      notifications.show({
        title: 'Your Availability Updated Successfully',
        color: 'green'
      })
      console.log({ result })
    }
  }
  return (
    <DashboardLayout title="Bookings">
      <Container size="lg">
        <Tabs defaultValue="upcoming">
          <Tabs.List position="center">
            <Tabs.Tab value="upcoming">Upcoming</Tabs.Tab>
            <Tabs.Tab value="pending">Pending</Tabs.Tab>
            <Tabs.Tab value="availability">Set Availability</Tabs.Tab>
            <Tabs.Tab value="past">Past</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="upcoming">
            {confirmedBookings ? (
              <SimpleGrid
                cols={4}
                mt={48}
                breakpoints={[
                  { maxWidth: 'xl', cols: 3, spacing: 'md' },
                  { maxWidth: 'md', cols: 3, spacing: 'sm' },
                  { maxWidth: 'sm', cols: 2, spacing: 'xs' },
                  { maxWidth: 'xs', cols: 1, spacing: 'xs' }
                ]}
              >
                {confirmedBookings.map((booking) => {
                  return (
                    <UpcomingMeetingCard
                      key={booking.id} // Don't forget to add a unique key for each mapped element
                      firstName={booking.Mentee.first_name}
                      lastName={booking.Mentee.last_name}
                      title={booking.Mentee.college}
                      time={booking.meeting_time}
                    />
                  )
                })}
              </SimpleGrid>
            ) : (
              <Loader mt={48} />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="pending">
            {pendingBookings ? (
              <SimpleGrid
                cols={4}
                mt={48}
                breakpoints={[
                  { maxWidth: 'xl', cols: 3, spacing: 'md' },
                  { maxWidth: 'md', cols: 3, spacing: 'sm' },
                  { maxWidth: 'sm', cols: 2, spacing: 'xs' },
                  { maxWidth: 'xs', cols: 1, spacing: 'xs' }
                ]}
              >
                {pendingBookings.map((booking) => {
                  return (
                    <UpcomingMeetingCard
                      key={booking.id} // Don't forget to add a unique key for each mapped element
                      firstName={booking.Mentee.first_name}
                      lastName={booking.Mentee.last_name}
                      title={booking.Mentee.college}
                      time={booking.meeting_time}
                      confirmClick={() => openConfirmPopup(booking.id)}
                      showButtons
                    />
                  )
                })}
              </SimpleGrid>
            ) : (
              <CustomLoader />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="availability">
            <Text
              mt={48}
              mb={32}
              align="center"
              color={theme.colors.darkGray[0]}
            >
              Set your availability
            </Text>
            <Stack spacing={32}>
              <Stack spacing={24}>
                <Flex justify="center" align="center" gap={48}>
                  <Flex gap={12}>
                    <Switch
                      size="lg"
                      checked={form.getInputProps('weekDayAvailable')}
                      {...form.getInputProps('weekDayAvailable', {
                        type: 'checkbox'
                      })}
                    />
                    <Text weight={700}>Weekdays</Text>
                  </Flex>
                  <Flex gap={12} align="center">
                    <Select
                      data={time}
                      defaultValue={form.getInputProps('weekDayStart')}
                      {...form.getInputProps('weekDayStart', {
                        type: 'select'
                      })}
                    />
                    <Text weight={700}>-</Text>
                    <Select
                      data={time}
                      defaultValue={form.getInputProps('weekDayEnd')}
                      {...form.getInputProps('weekDayEnd', {
                        type: 'select'
                      })}
                    />
                  </Flex>
                </Flex>
                <Flex justify="center" align="center" gap={48}>
                  <Flex gap={12}>
                    <Switch
                      size="lg"
                      checked={form.getInputProps('weekEndAvailable')}
                      {...form.getInputProps('weekEndAvailable', {
                        type: 'checkbox'
                      })}
                    />
                    <Text weight={700}>Weekends</Text>
                  </Flex>
                  <Flex gap={12} align="center">
                    <Select
                      data={time}
                      defaultValue={form.getInputProps('weekEndStart')}
                      {...form.getInputProps('weekEndStart', {
                        type: 'select'
                      })}
                    />
                    <Text weight={700}>-</Text>
                    <Select
                      data={time}
                      defaultValue={form.getInputProps('weekEndEnd')}
                      {...form.getInputProps('weekEndEnd', {
                        type: 'select'
                      })}
                    />
                  </Flex>
                </Flex>
              </Stack>
              <Center maw={320} miw={200} mx="auto">
                <PrimaryButton
                  text="Save"
                  onClick={updateAvailability}
                  loading={loadingUpdatedMentorData}
                />
              </Center>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="past">
            {reviews ? (
              <Center spacing={32} mt={48}>
                <Stack>
                  {reviews.map((review) => {
                    return (
                      <ReviewCard
                        key={review.id}
                        firstName={review.Mentee.first_name}
                        lastName={review.Mentee.last_name}
                        title={review.Mentee.college}
                        time={review.meeting_time}
                        rating={review.rating}
                        review={review.review}
                      />
                    )
                  })}
                </Stack>
              </Center>
            ) : (
              <CustomLoader />
            )}
          </Tabs.Panel>
        </Tabs>
      </Container>
      <Popup
        title={!isBookingConfirmed ? 'Confirm Booking' : 'Booking Confirmed'}
        isOpen={opened}
        isClosed={close}
      >
        {!isBookingConfirmed ? (
          <Stack>
            <TextInput
              placeholder="Meeting link"
              label="Send Meeting link"
              value={link}
              onChange={(event) => setLink(event.currentTarget.value)}
            />
            <PrimaryButton
              text="Send Meeting Link"
              onClick={confirmBooking}
              loading={updateBookingLoading}
            />
          </Stack>
        ) : (
          <Stack align="center">
            <IconDone />
          </Stack>
        )}
      </Popup>
    </DashboardLayout>
  )
}

export default BookingsMentor
