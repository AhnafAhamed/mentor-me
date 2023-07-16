import { Flex, Stack, Avatar, useMantineTheme, Text } from '@mantine/core'

const UserInfoCard = ({ image, firstName, lastName, college }) => {
  const theme = useMantineTheme()

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : ''
    const lastInitial = lastName ? lastName.charAt(0) : ''
    return `${firstInitial}${lastInitial}`
  }
  return (
    <Flex align="center">
      <Avatar
        src={image ? image : null}
        size={32}
        radius="xl"
        color={theme.colors.purple[0]}
      >
        {!image ? getInitials(firstName, lastName) : ''}
      </Avatar>
      <Stack spacing={0}>
        <Text size="md" weight={500}>
          {firstName + ' ' + lastName}
        </Text>
        <Text size="xs" color={theme.colors.gray[0]}>
          Student at {college}
        </Text>
      </Stack>
    </Flex>
  )
}

export default UserInfoCard
