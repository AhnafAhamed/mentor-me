import { Image, SimpleGrid, Stack, useMantineTheme } from '@mantine/core'
import Logo from '../branding/Logo'

const AuthLayout = ({ image, children }) => {
  const theme = useMantineTheme()
  return (
    <SimpleGrid cols={2} spacing={40}>
      <Image src={image} height="100vh" />
      <Stack mt={40}>
        <Logo
          iconSize={48}
          textSize="2xl"
          textColor={theme.colors.darkBlack}
          textWeight={600}
        />
        {children}
      </Stack>
    </SimpleGrid>
  )
}

export default AuthLayout
