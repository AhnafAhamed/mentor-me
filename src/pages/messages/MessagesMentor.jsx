import { useLocation, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import useSupabase from '../../hooks/useSupabase'
import {
  createChannel,
  getChannelsByMenteeId,
  getChannelsByMentorId
} from '../../services/Channels'
import ChannelList from '../../components/messages/ChannelList'
import Chat from '../../components/messages/Chat'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'
import supabase from '../../config/SupabaseClient'

const MessageMentor = () => {
  const params = useParams()

  const [showChat, setShowChat] = useState(false)
  const [channelId, setChannelId] = useState(null)
  const [activeChannel, setActiveChannel] = useState(null)

  const { data: channelsWithMentor, loading: channelsWithMentorLoading } =
    useSupabase(getChannelsByMentorId.bind(this, params?.id))

  const handleChannelClick = (channel) => () => {
    setShowChat(true)
    setChannelId(channel.id)
    setActiveChannel(channel)
  }

  return (
    <DashboardLayout title="Chats" className="hello">
      {showChat && channelId && (
        <Chat channel={activeChannel} isMentorView={true} />
      )}
      {!showChat && channelsWithMentor && (
        <ChannelList
          channels={channelsWithMentor}
          onChannelClick={handleChannelClick}
          isMentorView={true}
        />
      )}
    </DashboardLayout>
  )
}

export default MessageMentor
