import { Stack, Text, Title, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.lightPurple,
    borderRadius: '12px',
    padding: '16px'
  }
}))

const RevenueCard = ({ amount }) => {
  const { classes } = useStyles()
  return (
    <Stack className={classes.wrapper}>
      <Text>LKR</Text>
      <Title size={64}>{amount}</Title>
    </Stack>
  )
}

export default RevenueCard
