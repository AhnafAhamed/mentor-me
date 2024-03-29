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

const MessagesMentee = () => {
  const params = useParams()
  const location = useLocation()
  const state = location.state

  const [showChat, setShowChat] = useState(false)
  const [channelId, setChannelId] = useState(null)
  const [activeChannel, setActiveChannel] = useState(null)

  const {
    data: channelsWithMentee,
    loading: channelsWithMenteeLoading,
    getData: getNewChannelsWithMentee
  } = useSupabase(getChannelsByMenteeId.bind(this, params?.id))

  const { data: channelsWithMentor, loading: channelsWithMentorLoading } =
    useSupabase(getChannelsByMentorId.bind(this, state?.mentor))

  const {
    callService: createNewChannel,
    loading: createNewChannelLoading,
    data: createNewChannelData
  } = useSuapbaseWithCallback(createChannel)

  useEffect(() => {
    if (state && state?.mentor && channelsWithMentor?.length === 0) {
      const createChannel = async () => {
        await createNewChannel(state.mentor, parseInt(params.id))
      }

      createChannel()
    }
  }, [channelsWithMentor])

  useEffect(() => {
    if (createNewChannelData) {
      getNewChannelsWithMentee()
    }
  }, [createNewChannelData])

  const handleChannelClick = (channel) => () => {
    setShowChat(true)
    setChannelId(channel.id)
    setActiveChannel(channel)
  }

  return (
    <DashboardLayout title="Chats" className="hello">
      {showChat && channelId && (
        <Chat channel={activeChannel} isMentorView={false} />
      )}
      {!showChat && channelsWithMentee && (
        <ChannelList
          channels={channelsWithMentee}
          onChannelClick={handleChannelClick}
          isMentorView={false}
        />
      )}
    </DashboardLayout>
  )
}

export default MessagesMentee
