import {
  Badge,
  Button,
  Flex,
  Stack,
  Text,
  createStyles,
  useMantineTheme
} from '@mantine/core'
import UserInfoCard from '../global/UserInfoCard'
import EditButton from '../global/EditButton'
import IconEdit from '../icons/IconEdit'
import useUserStore from '../../store/userStore'
import { Link } from 'react-router-dom'
import { IconLogout, IconRotate } from '@tabler/icons-react'

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
  avatar,
  experience,
  workplace,
  college,
  age,
  jobTitle
}) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  const { user } = useUserStore()

  return (
    <Stack className={classes.wrapper} spacing={24}>
      <Flex justify="space-between">
        <UserInfoCard
          firstName={firstName}
          lastName={lastName}
          title={title}
          image={avatar}
          avatarSize={64}
          titleSize="xl"
          subTitleSize="md"
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
        {user.email && (
          <>
            <Text>Email:</Text>
            <Flex gap={10} wrap="wrap">
              <Badge className={classes.badge} size="md">
                {user.email}
              </Badge>
            </Flex>
          </>
        )}
        {age && (
          <>
            <Text>Age:</Text>
            <Flex gap={10} wrap="wrap">
              <Badge className={classes.badge} size="md">
                {age}
              </Badge>
            </Flex>
          </>
        )}
        {college !== '' && (
          <>
            <Text>College:</Text>
            <Flex gap={10} wrap="wrap">
              <Badge className={classes.badge} size="md">
                {college}
              </Badge>
            </Flex>
          </>
        )}
        {workplace !== '' && (
          <>
            <Text>Workplace:</Text>
            <Flex gap={10} wrap="wrap">
              <Badge className={classes.badge} size="md">
                {workplace}
              </Badge>
            </Flex>
          </>
        )}
        <Text>Interests:</Text>
        <Flex gap={10} wrap="wrap">
          {skills.map((skill) => (
            <Badge className={classes.badge} key={skill} size="md">
              {skill}
            </Badge>
          ))}
        </Flex>
      </Stack>
      <Flex mt={24} justify="space-between">
        <Link to="/forgot-password">
          <Button leftIcon={<IconRotate />} color="yellow">
            Reset Password
          </Button>
        </Link>
        <Link to="/logout">
          <Button leftIcon={<IconLogout />} color="red">
            Logout
          </Button>
        </Link>
      </Flex>
    </Stack>
  )
}

export default UserProfileCard
