import { useState, useEffect } from 'react'

const useSupabase = (supaBaseCall) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function getData() {
    setLoading(true)
    try {
      let { data, error } = await supaBaseCall()
      if (error) {
        setError(error)
      } else {
        setData(data)
      }
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { loading, data, error, getData }
}

export default useSupabase
