import { Flex, Tabs, Text, TextInput } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import { useEffect, useState } from 'react'
import supabase from '../../config/SupabaseClient'
import useUserStore from '../../store/userStore'
import Popup from '../../components/global/Popup'
import { useDisclosure } from '@mantine/hooks'
import PrimaryButton from '../../components/global/PrimaryButton'

const BookingsMentor = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [pendingBookings, setPendingBookings] = useState(null)
  const [confirmedBookings, setConfirmedBookings] = useState(null)
  const [meetingCards, setMeetingCards] = useState(null)
  const [confirmedMeetingCards, setConfirmedMeetingCards] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [link, setLink] = useState('')
  const { user } = useUserStore()

  useEffect(() => {
    getBookings('pending')
    getBookings('confirmed')
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
    const { data } = await supabase
      .from('bookings')
      .update({ confirmation_status: 'confirmed', meeting_link: link })
      .eq('id', selectedBooking)
      .select()
    console.log({ data })

    if (data) {
      console.log({ data })
      getBookings('pending')
      close()
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
  return (
    <DashboardLayout title="Bookings">
      <Tabs defaultValue="first">
        <Tabs.List position="center">
          <Tabs.Tab value="first">Upcoming</Tabs.Tab>
          <Tabs.Tab value="second">Pending</Tabs.Tab>
          <Tabs.Tab value="fourth">Past</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <h1>Upcoming</h1>
          {confirmedMeetingCards ? (
            <Flex gap={12}>{confirmedMeetingCards}</Flex>
          ) : (
            <Text>Loading...</Text>
          )}
          {confirmedMeetingCards?.length === 0 && (
            <Text>No pending bookings</Text>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <h1>Pending</h1>
          {meetingCards ? (
            <Flex gap={12}>{meetingCards}</Flex>
          ) : (
            <Text>Loading...</Text>
          )}
          {meetingCards?.length === 0 && <Text>No pending bookings</Text>}
        </Tabs.Panel>
        <Tabs.Panel value="fourth">
          <h1>Past</h1>
        </Tabs.Panel>
      </Tabs>
      <Popup title="Confirm Booking" isOpen={opened} isClosed={close}>
        <Text>Send Meeting Link</Text>
        <TextInput
          placeholder="Meeting link"
          value={link}
          onChange={(event) => setLink(event.currentTarget.value)}
        ></TextInput>
        <PrimaryButton text="Send Meeting Link" onClick={confirmBooking} />
      </Popup>
    </DashboardLayout>
  )
}

export default BookingsMentor
