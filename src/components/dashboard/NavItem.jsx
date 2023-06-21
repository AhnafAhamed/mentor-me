import { Flex, Text, createStyles, useMantineTheme } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  navItem: {
    '&:hover': {
      backgroundColor: theme.colors.lightPurple[0],
      borderRadius: '16px'
    }
  },
  navItemActive: {
    backgroundColor: theme.colors.lightPurple[0],
    borderRadius: '16px'
  }
}))

const NavItem = ({ icon, text, isActive }) => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  return (
    <Flex
      gap={16}
      align="center"
      px={20}
      py={12}
      className={[classes.navItem, isActive ? classes.navItemActive : '']}
    >
      {icon}
      <Text>{text}</Text>
    </Flex>
  )
}

export default NavItem
