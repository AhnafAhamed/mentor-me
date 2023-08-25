import { getMentorReviews, getReviews } from '../services/Review'
import useUserStore from '../store/userStore'
import useSupabase from './useSupabase'

const useReview = (mentorId) => {
  const { user } = useUserStore()

  const {
    loading: reviewsLoading,
    data: reviews,
    error: reviewsError,
    getData: getNewReviews
  } = useSupabase(getReviews)

  const {
    loading: mentoReviewsLoading,
    data: mentorReviews,
    error: mentorReviewsError,
    getData: getNewMentorReviews
  } = useSupabase(getMentorReviews.bind(this, mentorId))

  return {
    reviews,
    mentorReviews
  }
}

export default useReview
