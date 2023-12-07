import {
  Box,
  Image,
  MediaQuery,
  SimpleGrid,
  Stack,
  useMantineTheme,
  Text,
  Flex
} from '@mantine/core'
import Logo from '../branding/Logo'
import { useMediaQuery } from '@mantine/hooks'

const AuthLayout = ({ image, children }) => {
  const theme = useMantineTheme()
  const isTablet = useMediaQuery('(max-width: 992px)')
  return (
    <SimpleGrid cols={isTablet ? 1 : 2} spacing={40}>
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Image src={image} height="100vh" />
      </MediaQuery>

      <Stack mt={40}>
        <Flex pl={{ base: '20px', md: '0' }} align="center">
          <Logo
            iconSize={48}
            textSize="2xl"
            textColor={theme.colors.darkBlack}
            textWeight={600}
          />
          <Text size="lg" ml={12} weight={700}>
            Mentor Me
          </Text>
        </Flex>
        {children}
      </Stack>
    </SimpleGrid>
  )
}

export default AuthLayout
