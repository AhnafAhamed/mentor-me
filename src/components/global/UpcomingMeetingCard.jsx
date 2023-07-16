import { Stack, createStyles } from '@mantine/core'
import UserInfoCard from './UserInfoCard'

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: '12px'
  }
}))

const UpcomingMeetingCard = () => {
  const { classes } = useStyles()
  return (
    <Stack p={16} spacing={12}>
      <UserInfoCard />
    </Stack>
  )
}

export default UpcomingMeetingCard
