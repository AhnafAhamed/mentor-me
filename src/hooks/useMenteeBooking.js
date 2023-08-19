import useSupabase from './useSupabase'
import { getBookings, getMenteeBookings } from '../services/Booking'
import useUserStore from '../store/userStore'

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

  return {
    pendingBookings,
    confirmedBookings,
    getNewPendingBookings
  }
}

export default useMenteeBooking
