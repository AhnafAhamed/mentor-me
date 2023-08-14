import { Center, Loader, useMantineTheme } from '@mantine/core'

const CustomLoader = () => {
  const theme = useMantineTheme()

  return (
    <Center mt={48}>
      <Loader size="sm" color={theme.colors.purple[0]} />
    </Center>
  )
}

export default CustomLoader
