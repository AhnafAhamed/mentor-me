import { useForm } from '@mantine/form'
import Popup from '../global/Popup'
import CustomInput from '../global/CustomInput'

const UserRegistrationPopup = ({
  title,
  showLogo,
  showBackButton,
  isOpen,
  isClosed
}) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      role: '',
      firstName: '',
      lastName: '',
      gender: '',
      age: 0,
      college: '',
      workPlace: '',
      interests: [],
      expertise: [],
      jobTitle: '',
      experience: 0
    }

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })

  const next = () => {
    setCurrentStep(currentStep + 1) // Increment the current step by 1
  }

  return (
    <Popup
      title={title}
      showLogo={showLogo}
      showBackButton={showBackButton}
      isOpen={isOpen}
      isClosed={isClosed}
    >
      <form>
        <CustomInput
          label="Email"
          placeholder="Email"
          type="text"
          errorMessage="error"
        />
      </form>
    </Popup>
  )
}

export default UserRegistrationPopup
