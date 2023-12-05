import {
  Avatar,
  Box,
  Flex,
  ScrollArea,
  Text,
  TextInput,
  createStyles,
  useMantineTheme
} from '@mantine/core'
import IconSend from '../icons/IconSend'
import { useEffect, useState } from 'react'
import { addMessage, getMessages } from '../../services/Messages'
import useSupabase from '../../hooks/useSupabase'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'
import supabase from '../../config/SupabaseClient'
import useUserStore from '../../store/userStore'

// isMentorView is a boolean that determines whether the chat is being viewed by a mentor or mentee

const useStyles = createStyles((theme) => ({
  chat: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  userBar: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.lightPurple[0],
    borderRadius: theme.radius.md,
    columnGap: theme.spacing.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  message: {
    marginBottom: theme.spacing.md
  },
  messageText: {
    color: '#fff',
    backgroundColor: theme.colors.purple[0],
    padding: '8px' + ' ' + '12px',
    borderRadius: theme.radius.md
  }
}))

const Chat = ({ channel, isMentorView }) => {
  const [recepient, setRecipient] = useState(null)
  const [currentOwner, setCurrentOwner] = useState(null)
  const [text, setText] = useState('')
  const [newMessages, setNewMessages] = useState([])

  const { user } = useUserStore()
  const theme = useMantineTheme()
  const { classes } = useStyles()

  const { data: messages, loading: messagesLoading } = useSupabase(
    getMessages.bind(this, channel?.id)
  )

  const {
    callService: createNewMessage,
    loading: createNewMessageLoading,
    data: createNewMessageData
  } = useSuapbaseWithCallback(addMessage)

  useEffect(() => {
    setRecipient(isMentorView ? channel.Mentee : channel.Mentor)
  }, [channel])

  useEffect(() => {
    if (messages) {
      setNewMessages(messages)
    }
  }, [messages])

  const sendMessage = async () => {
    if (!text) return
    await createNewMessage(channel.id, text, user.user_uid)
    setText('')
  }

  useEffect(() => {
    const channels = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          console.log('Change received!', payload)
          setNewMessages((prev) => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => {
      channels.unsubscribe()
    }
  }, [])

  return (
    <div className={classes.chat}>
      <Flex className={classes.userBar}>
        <Avatar size="md" src={recepient?.image} radius={26} bgp="cover" />
        <Text size="md" fw={500}>
          {recepient?.first_name + ' ' + recepient?.last_name}
        </Text>
      </Flex>
      <ScrollArea mih="500px">
        {newMessages?.map((message, index) => (
          <Flex
            key={index}
            className={classes.message}
            justify={
              message.owner === user.user_uid ? 'flex-end' : 'flex-start'
            }
          >
            <Text
              className={classes.messageText}
              bg={
                message.owner === user.user_uid
                  ? 'purple'
                  : theme.colors.darkBlack[0]
              }
            >
              {message?.message}
            </Text>
          </Flex>
        ))}
      </ScrollArea>
      <TextInput
        placeholder="Type your message"
        rightSection={<IconSend onSend={sendMessage} />}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

export default Chat
