import { Avatar, Box, Flex, ScrollArea, Text, TextInput } from '@mantine/core'
import IconSend from '../icons/IconSend'
import { useEffect, useState } from 'react'

const Chat = ({ channelId }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    console.log('channel id', channelId)
    if (channelId) {
      // get messages
    }
  }, [channelId])

  return (
    <div className="chat">
      <Flex>
        <Avatar size={26} src="" radius={26} />
        <Text size="sm" fw={500}>
          User Name
        </Text>
      </Flex>
      {/* <ScrollArea>
        {messages?.map((message, index) => (
          <Box key={index} message={message}>
            Message
          </Box>
        ))}
        <Box key={index}>Message</Box>
      </ScrollArea> */}
      <TextInput placeholder="Type your message" rightSection={<IconSend />} />
    </div>
  )
}

export default Chat
