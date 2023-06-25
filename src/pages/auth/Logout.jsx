import { useEffect } from 'react'
import useUserStore from '../../store/userStore'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
  const navigate = useNavigate()
  const removeUser = useUserStore((state) => state.removeUser)
  useEffect(() => {
    removeUser()
    navigate('/sign-in')
  }, [])
}

export default LogOut
