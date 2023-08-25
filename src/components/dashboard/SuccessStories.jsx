import { Carousel } from '@mantine/carousel'
import { Text, createStyles } from '@mantine/core'
import UserInfoCard from '../global/UserInfoCard'

const useStyles = createStyles((theme) => ({
  carousel: {
    backgroundColor: theme.colors.lightPurple[0],
    borderRadius: '16px',
    padding: '24px 36px'
  }
}))

const SuccessStories = () => {
  const { classes } = useStyles()
  return (
    <Carousel
      mx="auto"
      loop
      withIndicators={false}
      controlsOffset={4}
      className={classes.carousel}
    >
      <Carousel.Slide className={classes.slide}>
        <Text mb={12}>
          Mentor me helped me find my dream Mentor, I found john whom guided me
          in my career growth. I would like to thanks everyone who helped me
          achieve this through Mentor Me. The resources share here are
          invaluable.
        </Text>
        <UserInfoCard
          firstName="Jane"
          lastName="Smith"
          image="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvdHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          title="Student at Esoft"
        />
      </Carousel.Slide>
      <Carousel.Slide className={classes.slide}>
        <Text mb={12}>
          Mentor me helped me find my dream Mentor, I found john whom guided me
          in my career growth. I would like to thanks everyone who helped me
          achieve this through Mentor Me. The resources share here are
          invaluable.
        </Text>
        <UserInfoCard
          firstName="Jina"
          lastName="Alfonzo"
          title="Student at IIT"
          image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90cmFpdCUyMHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        />
      </Carousel.Slide>
    </Carousel>
  )
}

export default SuccessStories
