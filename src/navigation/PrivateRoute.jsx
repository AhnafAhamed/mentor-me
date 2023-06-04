import { Navigate } from 'react-router-dom'
import useUserStore from '../store/userStore'

const PrivatRoute = ({ children }) => {
  //   const user = sessionStorage.getItem('token')
  const { user } = useUserStore()

  console.log({ user })

  return user ? children : <Navigate to="/sign-in" />
}

export default PrivatRoute
