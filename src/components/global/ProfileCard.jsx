import {
  Badge,
  Box,
  Flex,
  Image,
  Overlay,
  Stack,
  Text,
  createStyles
} from '@mantine/core'
import IconBriefCase from '../icons/IconBriefCase'
import IconStarFilled from '../icons/IconStarFilled'
import PrimaryButton from './PrimaryButton'
import PlaceHolderImage from '../../assets/images/profile-1.jpg'
import { useNavigate } from 'react-router-dom'
import IconMessage from '../icons/IconMessage'
import useUserStore from '../../store/userStore'

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    width: '260px',
    height: '300px',
    color: '#FFf',
    borderRadius: '16px'
  },
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  content: {
    width: '100%',
    padding: '0px 12px 12px'
  },
  fee: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: '#fff',
    color: theme.colors.darkBlack[0],
    borderRadius: '12px',
    padding: '4px 8px',
    fontSize: '12px'
  },
  feeIcon: {
    fontSize: '12px',
    marginRight: '4px',
    marginBottom: '3px'
  },
  message: {
    position: 'absolute',
    top: '48px',
    right: '12px',
    cursor: 'pointer'
  }
}))

const ProfileCard = ({
  name,
  jobTitle,
  experience,
  rating,
  image,
  company,
  fee,
  userId,
  id
}) => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const { user } = useUserStore()

  const viewProfile = () => {
    const currentPath = window.location.pathname

    if (currentPath.includes('/mentors')) {
      navigate(`${id}`)
    } else {
      navigate(`/mentors/${id}`)
    }
  }

  return (
    <Box className={classes.card}>
      <Image src={image ? image : PlaceHolderImage} radius={16} height={300} />
      <Overlay radius={16} className={classes.overlay}>
        <Stack spacing={0} className={classes.content}>
          <Text size="lg" weight={500} mb={8}>
            {name}
          </Text>

          <Stack spacing={4} mb={20}>
            <Flex gap={4} align="flex-start">
              <IconBriefCase />
              <Text size="xs">
                {jobTitle} at {company}
              </Text>
            </Flex>
            <Flex gap={4}>
              <Text size="xs">{experience}+ years of experience</Text>
              <Text size="xs">|</Text>
              <Flex gap={4} align="center">
                <IconStarFilled />
                <Text size="xs">{rating}/5</Text>
              </Flex>
            </Flex>
          </Stack>

          <PrimaryButton text="View Profile" onClick={viewProfile} size="sm" />
        </Stack>
        <Flex className={classes.fee} justify="center" align="center">
          <span className={classes.feeIcon}>💵</span> LKR {fee}/= Session
        </Flex>
        <Badge
          size="md"
          color="green"
          radius="xl"
          leftSection={<IconMessage size={16} />}
          w={100}
          mb={12}
          onClick={() =>
            navigate(`/messages/${user.id}`, {
              state: { mentor: id }
            })
          }
          className={classes.message}
        >
          Message
        </Badge>
      </Overlay>
    </Box>
  )
}

export default ProfileCard
