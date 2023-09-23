import { Button, Flex, Stack, Text, createStyles } from '@mantine/core'
import UserInfoCard from './UserInfoCard'
import IconTime from '../icons/IconTime'
import IconVideo from '../icons/IconVideo'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: '12px',
    backgroundColor: theme.colors.lightPurple
  }
}))

const UpcomingMeetingCard = ({
  image,
  firstName,
  lastName,
  title,
  time,
  showButtons,
  confirmClick,
  deleteClick,
  meetingLink
}) => {
  const { classes } = useStyles()
  return (
    <Stack className={classes.card} p={16} spacing={12}>
      <UserInfoCard
        image={image}
        firstName={firstName}
        lastName={lastName}
        title={title}
      />
      <Flex gap={20} align="center">
        <IconTime />
        <Text>{dayjs(time).format('DD MMM YYYY hh:mm A')}</Text>
      </Flex>
      <Flex gap={20} align="center">
        <IconVideo />
        <Text>Online Meeting</Text>
        {meetingLink && (
          <Link to={meetingLink} target="_blank">
            <PrimaryButton
              disabled={new Date() < new Date(time)}
              text="Join Meeting"
            />
          </Link>
        )}
      </Flex>
      {showButtons && (
        <Flex gap={10}>
          <PrimaryButton text="Confirm" onClick={confirmClick} />
          <SecondaryButton text="Delete" onClick={deleteClick} />
        </Flex>
      )}
    </Stack>
  )
}

export default UpcomingMeetingCard
