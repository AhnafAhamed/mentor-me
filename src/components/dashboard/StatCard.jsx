import { Box, Chip, Flex, Stack, Text, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: '12px',
    backgroundColor: 'transparent',
    border: '1px solid #EAEAEA',
    padding: '12px 20px',
    boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.03)'
  },
  icon: {
    width: '32px',
    height: '32px',
    border: '1px solid #EAEAEA',
    borderRadius: '12px',
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  currency: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#fff',
    backgroundColor: theme.colors.darkBlack[0],
    width: 'max-content',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  change: {
    fontSize: '12px',
    fontWeight: 500,
    border: '1px solid ',
    borderColor: theme.colors.green[4],
    color: theme.colors.green[4],
    width: 'max-content',
    padding: '2px 4px',
    borderRadius: '12px'
  }
}))

const StatCard = ({ icon, title, stat, change, isCurrency = true }) => {
  const { classes } = useStyles()
  return (
    <Stack className={classes.card} spacing={24} justify="space-between">
      <Flex align="center" justify="space-between" gap={8}>
        <Flex align="center" gap={8}>
          <Flex className={classes.icon} justify="center" align="center">
            {icon}
          </Flex>
          <Text size="sm" weight={500}>
            {title}
          </Text>
        </Flex>
        <Box className={classes.change}>+ 10%</Box>
      </Flex>
      <Stack spacing={0}>
        {isCurrency && <Box className={classes.currency}>LKR</Box>}
        <Text size={48} weight={700}>
          {stat}
        </Text>
      </Stack>
    </Stack>
  )
}

export default StatCard
