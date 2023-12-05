import { Avatar, Box, Flex, ScrollArea, Text, TextInput } from '@mantine/core'
import IconSend from '../icons/IconSend'
import { useEffect, useState } from 'react'
import { addMessage, getMessages } from '../../services/Messages'
import useSupabase from '../../hooks/useSupabase'
import useSuapbaseWithCallback from '../../hooks/useSupabaseWithCallback'

// isMentorView is a boolean that determines whether the chat is being viewed by a mentor or mentee

const Chat = ({ channel, isMentorView }) => {
  const [user, setUser] = useState(null)
  const [currentOwner, setCurrentOwner] = useState(null)
  const [text, setText] = useState('')

  const { data: messages, loading: messagesLoading } = useSupabase(
    getMessages.bind(this, channel?.id)
  )

  const {
    callService: createNewMessage,
    loading: createNewMessageLoading,
    data: createNewMessageData
  } = useSuapbaseWithCallback(addMessage)

  useEffect(() => {
    setUser(isMentorView ? channel.Mentee : channel.Mentor)
  }, [channel])

  const sendMessage = async () => {
    if (!text) return
    await createNewMessage(channel.id, text, isMentorView)
    setText('')
  }

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <div className="chat">
      <Flex>
        <Avatar size={26} src={user?.image} radius={26} />
        <Text size="sm" fw={500}>
          {user?.first_name + ' ' + user?.last_name}
        </Text>
      </Flex>
      <ScrollArea mih="500px">
        {messages?.map((message, index) => (
          <Flex
            key={index}
            align={
              message.is_mentor && isMentorView ? 'flex-start' : 'flex-end'
            }
          >
            {message?.message}
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
