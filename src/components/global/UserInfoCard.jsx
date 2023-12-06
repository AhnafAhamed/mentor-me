import { Flex, Stack, Avatar, useMantineTheme, Text } from '@mantine/core'

const UserInfoCard = ({
  image,
  firstName,
  lastName,
  title,
  avatarSize = 32,
  titleSize = 'md',
  subTitleSize = 'sm'
}) => {
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
        size={avatarSize}
        radius="xl"
        mr={12}
        color={theme.colors.purple[0]}
      >
        {!image ? getInitials(firstName, lastName) : ''}
      </Avatar>
      <Stack spacing={0}>
        <Text size={titleSize} weight={500}>
          {firstName + ' ' + lastName}
        </Text>
        <Text size={subTitleSize} color={theme.colors.gray[0]}>
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}

export default UserInfoCard
