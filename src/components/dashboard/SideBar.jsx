import { Stack, Text } from '@mantine/core'

const SideBar = () => {
  return (
    <Stack mih={400} spacing="lg" justify="center">
      <Text>🏠 Home</Text>
      <Text>🎯 Sessions</Text>
      <Text>📁 Resources</Text>
      <Text>📨 Messages</Text>
      <Text>🔩 Settings</Text>
    </Stack>
  )
}

export default SideBar
