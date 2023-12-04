import { useLocation, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useEffect } from 'react'

const MessagesMentee = () => {
  const params = useParams()
  const location = useLocation()
  const state = location.state

  useEffect(() => {
    console.log(params.id)
    console.log(state.mentor) // Access the state data here
  }, [params, state])

  return (
    <DashboardLayout title="Messages" className="hello">
      <h1>Hello</h1>
    </DashboardLayout>
  )
}

export default MessagesMentee
