import { Navigate } from 'react-router-dom'

const PrivatRoute = ({ children }) => {
  const user = sessionStorage.getItem('token')

  return user ? children : <Navigate to="/sign-in" />
}

export default PrivatRoute
