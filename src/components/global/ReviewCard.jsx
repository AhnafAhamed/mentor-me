import { Flex, Stack, Text, createStyles, useMantineTheme } from '@mantine/core'
import RatingStrip from './RatingStrip'
import UserInfoCard from './UserInfoCard'
import IconTime from '../icons/IconTime'

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: '12px',
    backgroundColor: theme.colors.lightPurple[0],
    padding: '16px'
  }
}))

const ReviewCard = ({
  image,
  firstName,
  lastName,
  title,
  time,
  rating,
  review
}) => {
  const { classes } = useStyles()
  return (
    <Stack className={classes.card}>
      <UserInfoCard
        image={image}
        firstName={firstName}
        lastName={lastName}
        title={title}
      />

      <Flex gap={20} align="center">
        <IconTime />
        <Text size="sm" weight={700}>
          {time}
        </Text>
      </Flex>
      <RatingStrip rating={rating} />
      <Text size="sm">{review}</Text>
    </Stack>
  )
}

export default ReviewCard
