import { Avatar, Group, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import useUserStore from '../../store/userStore'

const ChannelList = ({ channels }) => {
  const { user } = useUserStore()

  useEffect(() => {
    if (channels) {
      console.log(channels)
    }
  }, [channels])
  return (
    <>
      {channels?.map((channel) => {
        return (
          <Group key={channel.id}>
            <Avatar size="lg" src={channel.Mentor.image} alt="" />
            <Text>{channel.Mentor.first_name + channel.Mentor.last_name}</Text>
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
