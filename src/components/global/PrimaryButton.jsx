import { Button, createStyles, useMantineTheme } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    borderRadius: '12px',
    backgroundColor: theme.colors.purple[0],
    padding: '12px 24px',
    height: 'auto',
    lineHeight: '1.5',
    '&:hover': {
      backgroundColor: theme.colors.purple[0],
      opacity: 0.9
    }
  },
  inner: {
    fontSize: '16px'
  }
}))

const PrimaryButton = ({ text, loading, disabled, type }) => {
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
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
