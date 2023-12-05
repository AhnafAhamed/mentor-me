import { Avatar, Group, Text, createStyles } from '@mantine/core'
import { useEffect, useState } from 'react'
import useUserStore from '../../store/userStore'

const useStyles = createStyles((theme) => ({
  item: {
    border: `1px solid ${theme.colors.lightPurple[0]}`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xs,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.lightPurple[0]
    }
  }
}))

const ChannelList = ({ channels, onChannelClick }) => {
  const { user } = useUserStore()
  const { classes } = useStyles()

  useEffect(() => {
    if (channels) {
      console.log(channels)
    }
  }, [channels])
  return (
    <>
      {channels?.map((channel) => {
        return (
          <Group
            key={channel.id}
            mb={12}
            className={classes.item}
            onClick={onChannelClick(channel)}
          >
            <Avatar size="md" src={channel.Mentor.image} radius="50%" alt="" />
            <Text>
              {channel.Mentor.first_name + ' ' + channel.Mentor.last_name}
            </Text>
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
