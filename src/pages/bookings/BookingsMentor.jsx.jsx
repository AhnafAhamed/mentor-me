import {
  Box,
  Center,
  Container,
  Flex,
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
import supabase from '../../config/SupabaseClient'
import useUserStore from '../../store/userStore'
import Popup from '../../components/global/Popup'
import { useDisclosure } from '@mantine/hooks'
import PrimaryButton from '../../components/global/PrimaryButton'
import IconDone from '../../components/icons/IconDone'
import time from '../../data/time.json'
import { useForm } from '@mantine/form'
import { updateMentor } from '../../services/Mentor'
import { notifications } from '@mantine/notifications'

const BookingsMentor = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [pendingBookings, setPendingBookings] = useState(null)
  const [confirmedBookings, setConfirmedBookings] = useState(null)
  const [confirmBookingLoader, setConfirmBookingLoader] = useState(false)
  const [meetingCards, setMeetingCards] = useState(null)
  const [confirmedMeetingCards, setConfirmedMeetingCards] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [linkSent, setLinkSent] = useState(false)
  const [link, setLink] = useState('')
  const { user } = useUserStore()
  const theme = useMantineTheme()

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      weekDayStart: '17',
      weekDayEnd: '22',
      weekEndStart: '8',
      weekEndEnd: '14',
      weekEndAvailable: true,
      weekDayAvailable: false
    },

    validate: {
      weekDayEnd: (value, values) =>
        value < values.weekDayStart ? null : 'Invalid Time'
    }
  })

  useEffect(() => {
    console.log(form.values)
  }, [form.values])

  useEffect(() => {
    getBookings('pending')
    getBookings('confirmed')
    console.log({ time })
  }, [])

  useEffect(() => {
    renderUpcomingMeetingCards()
  }, [pendingBookings])

  useEffect(() => {
    renderConfirmedMeetingCards()
  }, [confirmedBookings])

  const getBookings = async (status) => {
    const { data } = await supabase
      .from('bookings')
      .select()
      .eq('confirmation_status', status)
      .eq('booked_mentor', user.user_uid)
    if (data && status === 'pending') {
      setPendingBookings(data)
    } else if (data && status === 'confirmed') {
      setConfirmedBookings(data)
    }
  }

  const getBookedMentee = async (id, type) => {
    const { data } = await supabase.from('Mentee').select().eq('user_uid', id)
    if (!data) return
    if (type === 'first') return data[0].first_name
    if (type === 'last') return data[0].last_name
    if (type === 'college') return data[0].college
  }

  const confirmBooking = async () => {
    setConfirmBookingLoader(true)
    const { data } = await supabase
      .from('bookings')
      .update({ confirmation_status: 'confirmed', meeting_link: link })
      .eq('id', selectedBooking)
      .select()
    console.log({ data })

    if (data) {
      setLinkSent(true)
      setConfirmBookingLoader(false)
      console.log({ data })
      getBookings('pending')
      setTimeout(() => {
        setLinkSent(false)
        close()
      }, 2000)
    }
  }

  const openConfirmPopup = (id) => {
    open()
    setSelectedBooking(id)
  }

  const renderUpcomingMeetingCards = async () => {
    if (!pendingBookings) return null

    const upcomingMeetingCards = await Promise.all(
      pendingBookings.map(async (booking) => {
        const firstName = await getBookedMentee(booking.booked_by, 'first')
        const lastName = await getBookedMentee(booking.booked_by, 'last')
        const title = await getBookedMentee(booking.booked_by, 'college')

        return (
          <UpcomingMeetingCard
            key={booking.id} // Don't forget to add a unique key for each mapped element
            firstName={firstName}
            lastName={lastName}
            title={title}
            time={booking.meeting_time}
            confirmClick={() => openConfirmPopup(booking.id)}
            showButtons
          />
        )
      })
    )
    console.log({ upcomingMeetingCards })
    setMeetingCards(upcomingMeetingCards)
  }

  const renderConfirmedMeetingCards = async () => {
    if (!confirmedBookings) return null

    const confirmedMeetingCards = await Promise.all(
      confirmedBookings.map(async (booking) => {
        const firstName = await getBookedMentee(booking.booked_by, 'first')
        const lastName = await getBookedMentee(booking.booked_by, 'last')
        const title = await getBookedMentee(booking.booked_by, 'college')

        return (
          <UpcomingMeetingCard
            key={booking.id} // Don't forget to add a unique key for each mapped element
            firstName={firstName}
            lastName={lastName}
            title={title}
            time={booking.meeting_time}
            meetingLink
          />
        )
      })
    )
    console.log({ confirmedMeetingCards })
    setConfirmedMeetingCards(confirmedMeetingCards)
  }

  const updateAvailability = async () => {
    console.log(form.values)
    const result = await updateMentor(user.user_uid, {
      availability: form.values
    })
    console.log({ result })
    if (result) {
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
        <Tabs defaultValue="first">
          <Tabs.List position="center">
            <Tabs.Tab value="first">Upcoming</Tabs.Tab>
            <Tabs.Tab value="second">Pending</Tabs.Tab>
            <Tabs.Tab value="third">Set Availability</Tabs.Tab>
            <Tabs.Tab value="fourth">Past</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="first">
            {confirmedMeetingCards ? (
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
                {confirmedMeetingCards}
              </SimpleGrid>
            ) : (
              <Text>Loading...</Text>
            )}
            {confirmedMeetingCards?.length === 0 && (
              <Text>No pending bookings</Text>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="second">
            {meetingCards ? (
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
                {meetingCards}
              </SimpleGrid>
            ) : (
              <Text>Loading...</Text>
            )}
            {meetingCards?.length === 0 && <Text>No pending bookings</Text>}
          </Tabs.Panel>
          <Tabs.Panel value="third">
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
                <PrimaryButton text="Save" onClick={updateAvailability} />
              </Center>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="fourth">
            <h1>Past</h1>
          </Tabs.Panel>
        </Tabs>
      </Container>
      <Popup
        title={!linkSent ? 'Confirm Booking' : 'Booking Confirmed'}
        isOpen={opened}
        isClosed={close}
      >
        {!linkSent ? (
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
              loading={confirmBookingLoader}
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
