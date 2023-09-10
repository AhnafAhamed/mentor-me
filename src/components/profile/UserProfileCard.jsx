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

const UserProfileCard = ({ onEditClick }) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  return (
    <Stack className={classes.wrapper} spacing={24}>
      <Flex justify="space-between">
        <UserInfoCard
          firstName="Ahnaf"
          lastName="Ahamed"
          title="Student at Esoft"
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
          <Badge className={classes.badge} size="md">
            Full Stack Development
          </Badge>
          <Badge className={classes.badge}>Product Management</Badge>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default UserProfileCard
