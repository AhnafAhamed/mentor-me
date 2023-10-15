import useSupabase from './useSupabase'
import { getBookings, getMenteeBookings } from '../services/Booking'
import useUserStore from '../store/userStore'
import { useEffect, useState } from 'react'

const useMenteeBooking = () => {
  const { user } = useUserStore()

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

  const {
    loading: completedBookingsLoading,
    data: completedBookings,
    error: completedBookingsError
  } = useSupabase(getMenteeBookings.bind(this, user.user_uid, 'completed'))

  return {
    pendingBookings,
    confirmedBookings,
    completedBookings,
    getNewPendingBookings
  }
}

export default useMenteeBooking
