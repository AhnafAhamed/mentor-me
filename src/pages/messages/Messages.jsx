import { Container } from '@mantine/core'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react'

import 'stream-chat-react/dist/css/v2/index.css'

const user = {
  id: 'ahnaf',
  name: 'Ahnaf Ahamed',
  image: 'https://getstream.io/random_png/?id=1&name=John+Doe'
}

const chatClient = new StreamChat('yzhtdeyzj2x6')

chatClient.connectUser(user, chatClient.devToken(user.id))

const channel = chatClient.channel('messaging', 'nlaf-chat', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'NLAF Chat',
  members: [user.id]
})

const Messages = () => {
  return (
    <DashboardLayout title="Messages" className="hello">
      <Container h="50%">
        <Chat client={chatClient} theme="str-chat__theme-light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </Container>
    </DashboardLayout>
  )
}

export default Messages
