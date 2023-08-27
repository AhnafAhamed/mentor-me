import { getMentorReviews, getReviews } from '../services/Review'
import useSupabase from './useSupabase'

const useReview = (mentorId) => {
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
