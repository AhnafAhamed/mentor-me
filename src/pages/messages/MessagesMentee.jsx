import { useLocation, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import useSupabase from '../../hooks/useSupabase'
import { createChannel, getChannelsByMemberId } from '../../services/Channels'
import ChannelList from '../../components/messages/ChannelList'
import Chat from '../../components/messages/Chat'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'

const MessagesMentee = () => {
  const params = useParams()
  const location = useLocation()
  const state = location.state

  const [showChat, setShowChat] = useState(false)
  const [channelId, setChannelId] = useState(null)

  const { data: channels, loading: channelsLoading } = useSupabase(
    getChannelsByMemberId.bind(this, state?.mentor || params.id)
  )

  const {
    callService: createNewChannel,
    loading: createNewChannelLoading,
    data: createNewChannelData
  } = useSuapbaseWithCallback(createChannel)

  useEffect(() => {
    if (state && state?.mentor) {
      const createChannel = async () => {
        await createNewChannel(state.mentor, params.id)
      }

      createChannel()
    }
  }, [params, state])

  useEffect(() => {
    console.log('create new channel data', createNewChannelData)
    if (createNewChannelData) {
      setShowChat(true)
      setChannelId(createNewChannelData[0].id)
    }
  }, [createNewChannelData])

  return (
    <DashboardLayout title="Messages" className="hello">
      {showChat && channelId && <Chat channel={channelId} />}
      {!showChat && channels && <ChannelList channels={channels} />}
    </DashboardLayout>
  )
}

export default MessagesMentee
