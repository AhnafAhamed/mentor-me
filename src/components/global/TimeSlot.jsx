import { Flex, Text, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    borderRadius: '12px',
    border: `1px solid ${theme.colors.darkBlack[0]}`,
    padding: '12px 24px',
    color: theme.colors.darkBlack[0],
    width: '200px',
    cursor: 'pointer'
  },
  rootSelected: {
    backgroundColor: theme.colors.accentGray[0],
    borderColor: theme.colors.accentGray[0],
    pointerEvents: 'none'
  },
  rootDisabled: {
    opacity: 0.5,
    pointerEvents: 'none'
  }
}))
const TimeSlot = ({ time, selected, disabled, slotClick }) => {
  const { classes } = useStyles()

  const rootClass = `${classes.root} ${selected ? classes.rootSelected : ''} ${
    disabled ? classes.rootDisabled : ''
  }`

  return (
    <Flex
      className={rootClass}
      justify="center"
      onClick={slotClick}
      aria-disabled={disabled}
    >
      <Text>{time}</Text>
    </Flex>
  )
}

export default TimeSlot
