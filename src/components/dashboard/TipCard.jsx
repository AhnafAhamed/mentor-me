import { Stack, Text, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.lightPurple[0],
    borderRadius: '16px',
    padding: '24px'
  }
}))

const TipCard = () => {
  const { classes } = useStyles()

  return (
    <Stack className={classes.wrapper} spacing={12}>
      <Text size="lg" weight={500}>
        💡 Tips for a Successful Mentorship Session
      </Text>
      <Text size="md">
        Plan an agenda! Plan out the questions and topics you'd like to discuss.
        If you'd like to work together on long-term goals, set some time to
        discuss expectations for each other.
      </Text>
    </Stack>
  )
}

export default TipCard
