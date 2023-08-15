import useSupabase from './useSupabase'
import { getBookings } from '../services/Booking'
import useUserStore from '../store/userStore'

const useMentorBooking = () => {
  const { user } = useUserStore()
  const {
    loading: pendingBookingsLoading,
    data: pendingBookings,
    error: pendingBookingsError,
    getData: getNewPendingBookings
  } = useSupabase(getBookings.bind(this, user.user_uid, 'pending'))

  const {
    loading: confirmedBookingsLoading,
    data: confirmedBookings,
    error: confirmedBookingsError
  } = useSupabase(getBookings.bind(this, user.user_uid, 'confirmed'))

  return {
    pendingBookings,
    confirmedBookings,
    getNewPendingBookings
  }
}

export default useMentorBooking
