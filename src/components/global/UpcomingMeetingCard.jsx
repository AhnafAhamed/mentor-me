import { Flex, Stack, Text, createStyles } from '@mantine/core'
import UserInfoCard from './UserInfoCard'
import IconTime from '../icons/IconTime'
import IconVideo from '../icons/IconVideo'

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: '12px'
  }
}))

const UpcomingMeetingCard = ({ image, firstName, lastName, title, time }) => {
  const { classes } = useStyles()
  return (
    <Stack>
      <Stack p={16} spacing={12}>
        <UserInfoCard
          image={image}
          firstName={firstName}
          lastName={lastName}
          title={title}
        />
        <Flex gap={20}>
          <IconTime />
          <Text>{time}</Text>
        </Flex>
        <Flex gap={20}>
          <IconVideo />
          <Text>Online Meeting</Text>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default UpcomingMeetingCard
