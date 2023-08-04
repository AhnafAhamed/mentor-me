import { useState } from 'react'
import {
  AppShell,
  Header,
  Burger,
  useMantineTheme,
  Container,
  Title
} from '@mantine/core'
import Navbar from '../dashboard/Navbar'
import { useMediaQuery } from '@mantine/hooks'
import Logo from '../branding/Logo'

export default function DashboardLayout({ title, children }) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const isTablet = useMediaQuery('(min-width: 62em)', true)

  return (
    <AppShell
      fixed
      styles={{
        main: {}
      }}
      navbarOffsetBreakpoint="md"
      navbar={<Navbar hidden={!opened} />}
      header={
        !isTablet && (
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />

              <Logo
                iconSize={24}
                showText
                textSize="md"
                textColor={theme.colors.darkBlack}
                textWeight={600}
              />
            </div>
          </Header>
        )
      }
    >
      <Container size={1320} pt={32}>
        {' '}
        <Title mb={48}>{title}</Title>
        {children}
      </Container>
    </AppShell>
  )
}
