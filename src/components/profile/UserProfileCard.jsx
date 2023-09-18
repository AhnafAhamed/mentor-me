import {
  Badge,
  Flex,
  Stack,
  Text,
  createStyles,
  useMantineTheme
} from '@mantine/core'
import UserInfoCard from '../global/UserInfoCard'
import EditButton from '../global/EditButton'
import IconEdit from '../icons/IconEdit'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.lightPurple[0],
    borderRadius: '16px',
    padding: '16px'
  },
  badge: {
    backgroundColor: '#DDDDDD40',
    color: theme.colors.darkBlack[0],
    alignItems: 'center',
    cursor: 'pointer'
  }
}))

const UserProfileCard = ({
  onEditClick,
  firstName,
  lastName,
  title,
  skills,
  avatar
}) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  return (
    <Stack className={classes.wrapper} spacing={24}>
      <Flex justify="space-between">
        <UserInfoCard
          firstName={firstName}
          lastName={lastName}
          title={title}
          image={avatar}
        />
        <Badge
          className={classes.badge}
          variant="filled"
          leftSection={<IconEdit />}
          onClick={onEditClick}
          size="lg"
        >
          Edit
        </Badge>
      </Flex>
      <Stack>
        <Text>Interests:</Text>
        <Flex gap={10} wrap="wrap">
          {skills.map((skill) => (
            <Badge className={classes.badge} key={skill} size="md">
              {skill}
            </Badge>
          ))}
        </Flex>
      </Stack>
    </Stack>
  )
}

export default UserProfileCard
