import { Avatar, Box, Flex, ScrollArea, TextInput } from '@mantine/core'
import IconSend from '../icons/IconSend'

const Chat = () => {
  const [messages, setMessages] = useState([])

  return (
    <div className="chat">
      <Flex>
        <Avatar size={26} src={item.avatar} radius={26} />
        <Text size="sm" fw={500}>
          User Name
        </Text>
      </Flex>
      <ScrollArea>
        {messages?.map((message, index) => (
          <Box key={index} message={message}>
            Message
          </Box>
        ))}
        <Box key={index} message={message}>
          Message
        </Box>
      </ScrollArea>
      <TextInput placeholder="Type your message" rightSection={<IconSend />} />
    </div>
  )
}

export default Chat
