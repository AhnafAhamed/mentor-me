import DashboardLayout from '../../components/layouts/DashboardLayout'
import ChannelList from '../../components/messages/ChannelList'

const MessagesMentor = () => {
  return (
    <DashboardLayout title="Messages" className="hello">
      <ChannelList />
    </DashboardLayout>
  )
}

export default MessagesMentor
