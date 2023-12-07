import { Stack, TextInput, Title, createStyles } from '@mantine/core'
import { useForm } from '@mantine/form'
import PrimaryButton from '../global/PrimaryButton'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { notifications } from '@mantine/notifications'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.lightPurple[0],
    borderRadius: '16px',
    padding: '16px',
    marginTop: '16px'
  },
  badge: {
    backgroundColor: '#DDDDDD40',
    color: theme.colors.darkBlack[0],
    alignItems: 'center',
    cursor: 'pointer'
  }
}))

const AccountDetails = ({ user }) => {
  const { classes } = useStyles()
  const [loading, setLoading] = useState(false)
  const formRef = useRef()

  const form = useForm({
    initialValues: {
      name: '',
      bank: '',
      branch: '',
      account: '',
      to_name: 'Admin',
      from_name: user.first_name + ' ' + user.last_name
    },
    validateInputOnBlur: true,
    validate: {
      name: (value) => (value ? null : 'Account Name is required'),
      bank: (value) => (value ? null : 'Bank is required'),
      branch: (value) => (value ? null : 'Bank Branch is required'),
      account: (value) => (value ? null : 'Bank Account No is required')
    }
  })

  useEffect(() => {
    emailjs.init('nhfa8zAPTvNZCU9NY')
  }, [])

  //   const submitForm = (e) => {
  //     console.log('current', formRef.current)
  //     e.preventDefault()
  //     if (!form.isValid()) return
  //     setLoading(true)
  //     const templateParams = {
  //       to_name: form.values.to_name,
  //       from_name: form.values.from_name,
  //       bank: form.values.bank,
  //       branch: form.values.branch,
  //       account: form.values.account,
  //       name: form.values.name
  //     }
  //     emailjs
  //       .sendForm('service_wis1t4g', 'template_2sou86s', formRef.current)
  //       .then(
  //         (result) => {
  //           notifications.show({
  //             title: 'Sent',
  //             message: 'Your request has been sent to admin for approval',
  //             color: 'green',
  //             autoClose: 5000
  //           })
  //           form.reset()
  //           console.log(result.text)
  //         },
  //         (error) => {
  //           console.log(error)

  //           notifications.show({
  //             title: 'Error',
  //             message: error.text,
  //             color: 'red',
  //             autoClose: 5000
  //           })
  //         }
  //       )
  //       .finally(() => {
  //         setLoading(false)
  //       })

  //     console.log(form.values)
  //   }

  const submitForm = (e) => {
    e.preventDefault()
    if (!form.isValid()) return
    setLoading(true)

    const data = {
      service_id: 'service_wis1t4g',
      template_id: 'template_bt83agr',
      user_id: 'nhfa8zAPTvNZCU9NY',
      template_params: {
        to_name: form.values.to_name,
        from_name: form.values.from_name,
        bank: form.values.bank,
        branch: form.values.branch,
        account: form.values.account,
        name: form.values.name
      }
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          notifications.show({
            title: 'Error',
            message: response.text(),
            color: 'red',
            autoClose: 5000
          })
          return
        }
        notifications.show({
          title: 'Sent',
          message: 'Your request has been sent to admin for approval',
          color: 'green',
          autoClose: 5000
        })
        form.reset()
        setLoading(false)
      })
      .catch((error) => {
        console.log('Oops... ' + JSON.stringify(error))
        setLoading(false)
        form.reset()
      })

    // ...
  }

  useEffect(() => {
    console.log(form.values)
  }, [form.values])
  return (
    <div className={classes.wrapper}>
      <form ref={formRef} onSubmit={submitForm}>
        <Stack spacing="sm">
          <Title order={4}>Account Details</Title>
          <TextInput
            label="Bank"
            placeholder="Bank"
            type="text"
            {...form.getInputProps('bank')}
          />
          <TextInput
            label="Branch"
            placeholder="Branch"
            type="text"
            {...form.getInputProps('branch')}
          />
          <TextInput
            label="Account No"
            placeholder="Account No"
            type="text"
            {...form.getInputProps('account')}
          />
          <TextInput
            label="Account Name"
            placeholder="Account Name"
            type="text"
            {...form.getInputProps('name')}
          />
          <PrimaryButton
            type="submit"
            disabled={!form.isValid()}
            text="Request Transfer Fund to Account"
            loading={loading}
          ></PrimaryButton>
        </Stack>
      </form>
    </div>
  )
}

export default AccountDetails
