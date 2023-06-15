import { Modal, Title, createStyles } from '@mantine/core'
import Logo from '../branding/Logo'
import IconArrowBack from '../icons/IconArrowBack'

const useStyles = createStyles((theme) => ({
  header: {
    padding: '32px 24px 24px 24px'
  },
  body: {
    padding: '0px 24px 32px 24px'
  }
}))

const Popup = ({
  title,
  showLogo,
  showBackButton,
  isOpen,
  isClosed,
  children
}) => {
  const { classes } = useStyles()
  return (
    <>
      <Modal.Root opened={isOpen} onClose={isClosed} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className={classes.header}>
            <Modal.Title>
              {showLogo ? <Logo showText={false} iconSize={48} /> : null}
              {showBackButton ? <IconArrowBack /> : null}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>

          <Modal.Body className={classes.body}>
            <Title size="lg" ta="center">
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
