import Layout from '../../components/Layout'
import useUserStore from '../../store/userStore'

const Home = () => {
  const { user } = useUserStore()
  return (
    <Layout>
      <h1>{user.email}</h1>
    </Layout>
  )
}

export default Home
