import { Avatar, Flex, Stack, Text, useMantineTheme } from '@mantine/core'
import { Link } from 'react-router-dom'

const ProfileInfoCard = ({ firstName, lastName, image }) => {
  const theme = useMantineTheme()

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : ''
    const lastInitial = lastName ? lastName.charAt(0) : ''
    return `${firstInitial}${lastInitial}`
  }

  return (
    <Flex align="center" gap={10}>
      <Avatar
        src={image ? image : null}
        size={36}
        radius="xl"
        color={theme.colors.purple[0]}
      >
        {!image ? getInitials(firstName, lastName) : ''}
      </Avatar>
      <Stack spacing={0}>
        <Text size="md" weight={700}>
          {firstName + ' ' + lastName}
        </Text>
        <Link to="/profile">
          <Text size="xs" color={theme.colors.purple[0]} weight={700}>
            View Profile
          </Text>
        </Link>
      </Stack>
    </Flex>
  )
}

export default ProfileInfoCard
