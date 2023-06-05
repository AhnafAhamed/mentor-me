import Layout from '../../components/Layout'
import useUserStore from '../../store/userStore'
import supabase from '../../config/SupabaseClient'
import { useEffect, useState } from 'react'
import { Button, Card, Text } from '@mantine/core'

const Main = () => {
  const { user } = useUserStore()
  const [mentors, setMentors] = useState([])

  async function fetchData() {
    const { data, error } = await supabase.from('Mentor').select()
    console.log({ data })
    if (error) console.log('Error fetching data from Supabase:', error)
    else setMentors(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      {mentors?.map((item) => (
        <Card key={item.id}>
          <Text>{item.first_name + item.last_name}</Text>
          <Text>{item.job_title}</Text>
          <Button>Book Session</Button>
        </Card>
      ))}
    </Layout>
  )
}

export default Main
