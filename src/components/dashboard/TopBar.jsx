import { Avatar, Flex, Text } from '@mantine/core'

const TopBar = () => {
  return (
    <Flex justify="space-between" align="center" p={10}>
      <Text>MentorMe</Text>
      <Avatar
        radius="xl"
        src="https://picsum.photos/id/64/200/300"
        alt="profile"
      />
    </Flex>
  )
}

export default TopBar
