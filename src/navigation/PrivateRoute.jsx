import { Navigate } from 'react-router-dom'
import useUserStore from '../store/userStore'

const PrivatRoute = ({ children }) => {
  const { user } = useUserStore()

  return user ? children : <Navigate to="/sign-in" />
}

export default PrivatRoute
