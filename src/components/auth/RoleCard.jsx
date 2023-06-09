import { Flex, Group, Image, Stack, Text, createStyles } from '@mantine/core'
import IconArrowRight from '../icons/IconArrowRight'

const useStyles = createStyles((theme) => ({
  wrapper: {
    border: `1px solid ${theme.colors.accentGray}`,
    borderRadius: '16px',
    cursor: 'pointer',
    '&:hover': {
      border: `1px solid ${theme.colors.darkBlack}`
    }
  }
}))

const RoleCard = ({ icon, title, description, clickEvent }) => {
  const { classes } = useStyles()
  return (
    <Stack
      maw={400}
      p={24}
      spacing={12}
      className={classes.wrapper}
      onClick={clickEvent}
    >
      <Flex align="center" justify="space-between">
        <Group>
          <Image src={icon} width={24} />
          <Text size="lg" weight={600}>
            {title}
          </Text>
        </Group>
        <IconArrowRight />
      </Flex>
      <Text size="md">{description}</Text>
    </Stack>
  )
}

export default RoleCard
