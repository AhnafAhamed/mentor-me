import {
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
import { Link } from 'react-router-dom'

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
  }
}))

const ProfileCard = ({
  name,
  jobTitle,
  experience,
  rating,
  image,
  company,
  id
}) => {
  const { classes } = useStyles()

  const viewProfile = () => {
    console.log('View Profile')
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
          <Link to={`mentors/${id}`}>
            <PrimaryButton text="View Profile" onClick={viewProfile} />
          </Link>
        </Stack>
      </Overlay>
    </Box>
  )
}

export default ProfileCard
