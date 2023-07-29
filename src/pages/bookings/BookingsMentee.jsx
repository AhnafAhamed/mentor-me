import { Tabs, Text } from '@mantine/core'
import UpcomingMeetingCard from '../../components/global/UpcomingMeetingCard'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import supabase from '../../config/SupabaseClient'
import { useEffect, useState } from 'react'
import useUserStore from '../../store/userStore'

const BookingsMentee = () => {
  const [pendingBookings, setPendingBookings] = useState(null)
  const [meetingCards, setMeetingCards] = useState(null)
  const { user } = useUserStore()

  useEffect(() => {
    getBookings()
  }, [])

  useEffect(() => {
    renderUpcomingMeetingCards()
  }, [pendingBookings])

  const getBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select()
      .eq('confirmation_status', 'pending')
      .eq('booked_by', user.user_uid)
    if (data) {
      setPendingBookings(data)
    }
  }

  const getBookedMentor = async (id, type) => {
    const { data } = await supabase.from('Mentor').select().eq('user_uid', id)
    if (!data) return
    if (type === 'first') return data[0].first_name
    if (type === 'last') return data[0].last_name
    if (type === 'workplace') return data[0].workplace
  }

  const renderUpcomingMeetingCards = async () => {
    if (!pendingBookings) return null

    const upcomingMeetingCards = await Promise.all(
      pendingBookings.map(async (booking) => {
        const firstName = await getBookedMentor(booking.booked_mentor, 'first')
        const lastName = await getBookedMentor(booking.booked_mentor, 'last')
        const title = await getBookedMentor(booking.booked_mentor, 'workplace')

        return (
          <UpcomingMeetingCard
            key={booking.id} // Don't forget to add a unique key for each mapped element
            firstName={firstName}
            lastName={lastName}
            title={title}
            time={booking.meeting_time}
          />
        )
      })
    )
    console.log({ upcomingMeetingCards })
    setMeetingCards(upcomingMeetingCards)
  }

  return (
    <DashboardLayout title="Bookings">
      <Tabs defaultValue="first">
        <Tabs.List position="center" mb={48}>
          <Tabs.Tab value="first">Pending</Tabs.Tab>
          <Tabs.Tab value="second">Confirmed</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first">
          {meetingCards ? meetingCards : <Text>No pending bookings</Text>}
        </Tabs.Panel>

        <Tabs.Panel value="second">
          <Text>Reviews</Text>
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  )
}

export default BookingsMentee
