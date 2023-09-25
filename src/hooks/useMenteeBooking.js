import useSupabase from './useSupabase'
import { getBookings, getMenteeBookings } from '../services/Booking'
import useUserStore from '../store/userStore'
import { useEffect, useState } from 'react'

const useMenteeBooking = () => {
  const { user } = useUserStore()
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [pastBookings, setPastBookings] = useState([])
  const {
    loading: pendingBookingsLoading,
    data: pendingBookings,
    error: pendingBookingsError,
    getData: getNewPendingBookings
  } = useSupabase(getMenteeBookings.bind(this, user.user_uid, 'pending'))

  const {
    loading: confirmedBookingsLoading,
    data: confirmedBookings,
    error: confirmedBookingsError
  } = useSupabase(getMenteeBookings.bind(this, user.user_uid, 'confirmed'))

  useEffect(() => {
    if (confirmedBookings) {
      const upcoming = confirmedBookings.filter(
        (booking) => new Date(booking.meeting_time) > new Date()
      )
      const past = confirmedBookings.filter(
        (booking) => new Date(booking.meeting_time) < new Date()
      )
      console.log({ upcoming, past })
      setUpcomingBookings(upcoming)
      setPastBookings(past)
    }
  }, [confirmedBookings])

  return {
    pendingBookings,
    confirmedBookings,
    upcomingBookings,
    pastBookings,
    getNewPendingBookings
  }
}

export default useMenteeBooking
