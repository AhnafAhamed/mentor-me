import { Flex, useMantineTheme } from '@mantine/core'
import IconStar from '../icons/IconStar'

const RatingStrip = ({ rating, getRating, isEditable }) => {
  const theme = useMantineTheme()

  const getStarColor = (index) => {
    if (index + 1 <= rating) {
      return theme.colors.gold
    } else {
      return theme.colors.accentGray[0]
    }
  }

  const handleStarClick = (rating) => {
    if (!isEditable) return
    getRating(rating)
  }

  return (
    <Flex gap={4}>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <IconStar
            key={index}
            color={getStarColor(index)}
            isEditable={isEditable}
            handleClick={() => handleStarClick(index)}
          />
        ))}
    </Flex>
  )
}

export default RatingStrip
