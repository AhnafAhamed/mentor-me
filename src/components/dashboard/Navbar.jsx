import { Link, useMatch } from 'react-router-dom'
import useUserStore from '../../store/userStore'
import Logo from '../branding/Logo'
import NavItem from './NavItem'
import IconHome from '../icons/IconHome'
import IconMessage from '../icons/IconMessage'
import IconResource from '../icons/IconResource'
import ProfileInfoCard from '../dashboard/ProfileInfoCard'
import IconBooking from '../icons/IconBooking'
import IconMentor from '../icons/IconMentor'
import IconStats from '../icons/IconStats'
import {
  useMantineTheme,
  Navbar as MantineNavbar,
  Stack,
  MediaQuery,
  Box,
  createStyles
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  navbar: {
    borderRight: `1px solid ${theme.colors.accentGray}`
  }
}))

const Navbar = ({ hidden }) => {
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
      link: `/messages/${user?.id}`,
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
    <MantineNavbar
      hidden={hidden}
      hiddenBreakpoint="md"
      width={{ base: '100%', sm: 260 }}
      py={48}
      px={24}
      fixed
      className={classes.navbar}
    >
      <Stack justify="space-between" align="center" h="100%">
        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          <Box>
            <Logo
              iconSize={32}
              showText
              textSize="lg"
              textColor={theme.colors.darkBlack}
              textWeight={600}
            />
          </Box>
        </MediaQuery>

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
    </MantineNavbar>
  )
}

export default Navbar
