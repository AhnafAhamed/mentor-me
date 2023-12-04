import { Avatar, Group, Text } from '@mantine/core'
import { useEffect } from 'react'

const ChannelList = ({ channels }) => {
  useEffect(() => {
    console.log('channels', channels)
  }, [channels])
  return (
    <>
      {channels?.map((channel) => {
        return (
          <Group key={channel.id}>
            <Avatar size="lg" src="" alt="" />
            <Text>{channel.id}</Text>
          </Group>
        )
      })}
      {channels?.length === 0 && (
        <Text>You have no messages. Start a conversation!</Text>
      )}
    </>
  )
}

export default ChannelList
