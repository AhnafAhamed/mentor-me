import { Box, Modal, Title, createStyles } from '@mantine/core'
import Logo from '../branding/Logo'
import IconArrowBack from '../icons/IconArrowBack'

const useStyles = createStyles((theme) => ({
  header: {
    padding: '32px 24px 24px 24px'
  },
  body: {
    padding: '0px 24px 32px 24px'
  },
  hoverEffect: {
    cursor: 'pointer'
  }
}))

const Popup = ({
  title,
  showLogo,
  showBackButton,
  isOpen,
  isClosed,
  backClick,
  children
}) => {
  const { classes } = useStyles()
  const clik = () => {
    console.log('clik')
  }
  return (
    <>
      <Modal.Root opened={isOpen} onClose={isClosed} size="lg" centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className={classes.header}>
            <Modal.Title>
              {showLogo ? <Logo showText={false} iconSize={48} /> : null}
              {showBackButton ? (
                <Box className={classes.hoverEffect} onClick={backClick}>
                  <IconArrowBack />
                </Box>
              ) : null}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>

          <Modal.Body className={classes.body}>
            <Title order={4} ta="center" mb={24}>
              {title}
            </Title>
            {children}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default Popup
