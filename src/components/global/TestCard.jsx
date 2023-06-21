import { AspectRatio, Button, Image, Overlay } from '@mantine/core'

const TestCard = () => {
  return (
    <AspectRatio ratio={16 / 9} w={400} mx="auto">
      <Image src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80" />
      <Overlay blur={15} center>
        <Button color="red" radius="xl">
          NSFW, click to reveal
        </Button>
      </Overlay>
    </AspectRatio>
  )
}

export default TestCard
