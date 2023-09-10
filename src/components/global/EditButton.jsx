import { Flex, Text, createStyles, useMantineTheme } from '@mantine/core'
import IconEdit from '../icons/IconEdit'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: '#DDDDDD40',
    borderRadius: '8px',
    padding: '4px 8px'
  }
}))

const EditButton = ({ ...props }) => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  return (
    <Flex className={classes.wrapper} gap={4} align="center" {...props}>
      <IconEdit />
      <Text size="xs" color={theme.colors.darkBlack[0]} />
    </Flex>
  )
}

export default EditButton
