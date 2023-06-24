import {
  Grid,
  ScrollArea,
  Stack,
  Title,
  createStyles,
  useMantineTheme
} from '@mantine/core'
import Logo from '../branding/Logo'
import { Link, useMatch } from 'react-router-dom'
import NavItem from '../dashboard/NavItem'
import IconHome from '../icons/IconHome'
import IconMessage from '../icons/IconMessage'
import IconResource from '../icons/IconResource'
import ProfileInfoCard from '../dashboard/ProfileInfoCard'
import useUserStore from '../../store/userStore'
import { useEffect } from 'react'
import IconBooking from '../icons/IconBooking'
import IconMentor from '../icons/IconMentor'
import IconStats from '../icons/IconStats'

const useStyles = createStyles((theme) => ({
  grid: {
    height: '100vh'
  },
  sideBar: {
    borderRight: `1px solid ${theme.colors.lightPurple[0]}`
  }
}))

const DashboardLayout = ({ title, children }) => {
  const theme = useMantineTheme()
  const { user } = useUserStore()
  const { classes } = useStyles()

  const navItems = [
    {
      link: '/',
      icon: <IconHome />,
      text: 'Home'
    },
    {
      link: '/bookings',
      icon: <IconBooking />,
      text: 'Bookings'
    },
    user?.user_metadata.role === 'mentee'
      ? {
          link: '/mentors',
          icon: <IconMentor />,
          text: 'Mentors'
        }
      : {
          link: '/stats',
          icon: <IconStats />,
          text: 'Stats'
        },
    {
      link: '/messages',
      icon: <IconMessage />,
      text: 'Messages'
    },
    {
      link: '/resources',
      icon: <IconResource />,
      text: 'Resources'
    }
  ]
  return (
    <Grid grow m={0} h="100vh">
      <Grid.Col span={2} py={48} pl={32} pr={20} className={classes.sideBar}>
        <Stack justify="space-between" align="center" h="100%">
          <Logo
            iconSize={32}
            showText
            textSize="lg"
            textColor={theme.colors.darkBlack}
            textWeight={600}
          />

          <Stack>
            {navItems.map((item) => {
              return (
                <Link to={item.link} key={item.link}>
                  <NavItem
                    icon={item.icon}
                    text={item.text}
                    isActive={useMatch(item.link)}
                  />
                </Link>
              )
            })}
          </Stack>

          <ProfileInfoCard
            firstName={user?.first_name}
            lastName={user?.last_name}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={8} pt={48} px={48} h="100%">
        {/* <Container size="xl" > */}

        <ScrollArea type="auto" h="100%">
          <Title mb={48}>{title}</Title>
          {children}
        </ScrollArea>

        {/* </Container> */}
      </Grid.Col>
    </Grid>
  )
}

export default DashboardLayout
