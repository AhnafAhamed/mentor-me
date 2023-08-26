import { Flex, Stack, Text, createStyles, useMantineTheme } from '@mantine/core'
import UserInfoCard from '../global/UserInfoCard'
import dayjs from 'dayjs'
import IconLink from '../icons/IconLink'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.lightPurple[0],
    borderRadius: '12px',
    padding: '16px'
  }
}))

const ResourceCard = ({
  title,
  description,
  firstName,
  lastName,
  image,
  date,
  link
}) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  return (
    <Stack spacing={12} className={classes.card} maw={500}>
      <Flex justify="space-between" align="center">
        <Text size="lg" weight="bold" color={theme.colors.purple[0]}>
          {title}
        </Text>
        <Link to={link} target="_blank">
          <IconLink />
        </Link>
      </Flex>

      <Text size="sm" color={theme.colors.darkGray[0]}>
        {description}
      </Text>
      <UserInfoCard
        image={image}
        firstName={firstName}
        lastName={lastName}
        title={dayjs(date).format('DD MMM YYYY')}
      />
    </Stack>
  )
}

export default ResourceCard
