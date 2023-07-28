import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import supabase from '../../config/SupabaseClient'
import {
  Box,
  createStyles,
  Avatar,
  Title,
  Stack,
  Flex,
  Text,
  Tabs
} from '@mantine/core'
import PrimaryButton from '../../components/global/PrimaryButton'
import Popup from '../../components/global/Popup'
import { useDisclosure } from '@mantine/hooks'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'relative',
    width: '100%',
    height: '80px',
    borderRadius: '12px',
    background:
      'linear-gradient(120deg, #513DFF 0.32%, #A89EFF 32.05%, #C8C2FF 60.52%, #EFEEFF 96.20%)'
  },
  avatar: {
    position: 'absolute',
    left: '30px',
    bottom: '-40px'
  },
  workplace: {
    color: theme.colors.darkPurple,
    fontWeight: 500
  }
}))

const MentorProfile = () => {
  let { userId } = useParams()
  const { classes } = useStyles()
  const [mentor, setMentor] = useState(null)
  const [opened, { open, close }] = useDisclosure(false)

  const getMentor = async () => {
    const { data, error } = await supabase
      .from('Mentor')
      .select()
      .eq('user_uid', userId)
    setMentor(data[0])
    console.log(data)
  }

  useEffect(() => {
    getMentor()
    console.log({ userId })
  }, [userId])
  return (
    <DashboardLayout>
      <Box className={classes.header}>
        <Avatar
          className={classes.avatar}
          src="https://cdn.pixabay.com/photo/2020/05/09/13/29/photographer-5149664_1280.jpg"
          radius={80}
          size={80}
        />
      </Box>
      <Stack mt={80}>
        <Title mb={8}>{mentor?.first_name + ' ' + mentor?.last_name}</Title>
        <Flex>
          <Text size="md">
            {mentor?.job_title} at{' '}
            <span className={classes.workplace}> {mentor?.workplace}</span>
          </Text>
        </Flex>
      </Stack>
      <Tabs defaultValue="first">
        <Tabs.List position="center" mb={48}>
          <Tabs.Tab value="first">Overview</Tabs.Tab>
          <Tabs.Tab value="second">Reviews</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first">
          <Text size="md">{mentor?.introduction}</Text>
          <PrimaryButton text="Book Now" onClick={open} />
        </Tabs.Panel>

        <Tabs.Panel value="second">
          <Text>Reviews</Text>
        </Tabs.Panel>
      </Tabs>
      <Popup
        title="Book Mentor"
        showLogo={false}
        showBackButton={false}
        isOpen={opened}
        isClosed={close}
      >
        <h1>hello</h1>
      </Popup>
    </DashboardLayout>
  )
}

export default MentorProfile
