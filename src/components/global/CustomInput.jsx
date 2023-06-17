import { Input, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors.darkBlack,
    fontSize: theme.fontSizes.md,
    marginBottom: '8px'
  },
  input: {
    fontSize: theme.fontSizes.md,
    padding: '16px',
    borderRadius: '12px',
    lineHeight: 1,
    height: 'unset',
    border: `1px solid ${theme.colors.accentGray[0]}`,
    '&:focus': {
      border: `1px solid ${theme.colors.darkBlack[0]}`
    }
  },
  error: {
    textAlign: 'center'
  }
}))

const CustomInput = ({ type, placeholder, label, errorMessage, error }) => {
  const { classes } = useStyles()
  return (
    <Input.Wrapper
      label={label}
      error={errorMessage}
      classNames={{
        label: classes.label,
        input: classes.input,
        error: classes.error
      }}
    >
      <Input
        type={type}
        error={error}
        placeholder={placeholder}
        classNames={{
          input: classes.input,
          error: classes.error
        }}
      ></Input>
    </Input.Wrapper>
  )
}

export default CustomInput
