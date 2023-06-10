import AuthLayout from '../../components/layouts/AuthLayout'
import CoverImage from '../../assets/images/auth-cover.jpg'
import {
  Flex,
  Stack,
  Text,
  Title,
  createStyles,
  useMantineTheme
} from '@mantine/core'
import RoleCard from '../../components/auth/RoleCard'
import IconGraduateCap from '../../assets/images/graduate-cap.png'
import IconQualification from '../../assets/images/qualification.png'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignSelf: 'center'
  }
}))

const SignUp = () => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  console.log({ theme })
  return (
    <div>
      <AuthLayout image={CoverImage}>
        <Stack spacing={0} mt={120} className={classes.wrapper}>
          <Stack spacing={12} mb={40}>
            <Title weight={700}>Get Started with Mentor Me</Title>
            <Text>Select the type of account you’d like to create.</Text>
          </Stack>

          <Stack spacing={24} mb={20}>
            <RoleCard
              title="Mentee"
              description="Build you tech career"
              icon={IconGraduateCap}
            />
            <RoleCard
              title="Mentor"
              description="Make money doing what you love"
              icon={IconQualification}
            />
          </Stack>

          <Flex gap={4}>
            <Text>Already have an account?</Text>
            <Link to="/sign-in">
              <Text weight={600} td="underline">
                Sign In
              </Text>
            </Link>
          </Flex>
        </Stack>
      </AuthLayout>
    </div>
  )
}

export default SignUp
