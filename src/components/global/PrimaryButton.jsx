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
    },
    '&:disabled': {
      opacity: 0.6
    }
  },
  inner: {
    fontSize: '16px'
  },
  centerLoader: {
    position: 'unset'
  }
}))

const PrimaryButton = ({
  text,
  loading,
  disabled,
  type,
  onClick,
  ...props
}) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()

  return (
    <Button
      classNames={{
        root: classes.root,
        inner: classes.inner,
        centerLoader: classes.centerLoader
      }}
      fullWidth
      loading={loading}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...props}
      loaderPosition="center"
    >
      {loading ? '' : text}
    </Button>
  )
}

export default PrimaryButton
