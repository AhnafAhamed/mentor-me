import { Button, createStyles, useMantineTheme } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    borderRadius: '12px',
    backgroundColor: theme.colors.lightPurple[0],
    color: theme.colors.darkPurple,
    padding: '12px 24px',
    height: 'auto',
    lineHeight: '1.5',
    '&:hover': {
      backgroundColor: theme.colors.lightPurple[0],
      opacity: 0.9
    }
  },
  inner: {
    fontSize: '16px'
  }
}))

const SecondaryButton = ({ text, loading, disabled, type, onClick }) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()

  return (
    <Button
      classNames={{
        root: classes.root,
        inner: classes.inner
      }}
      fullWidth
      loading={loading}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default SecondaryButton
