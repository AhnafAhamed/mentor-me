import { getReviews } from '../services/Review'
import useSupabase from './useSupabase'

const useReview = () => {
  const {
    loading: reviewsLoading,
    data: reviews,
    error: reviewsError,
    getData: getNewReviews
  } = useSupabase(getReviews)

  return {
    reviews
  }
}

export default useReview
