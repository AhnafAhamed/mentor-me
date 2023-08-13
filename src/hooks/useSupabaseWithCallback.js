import { useState } from 'react'

const useSuapbaseWithCallback = (supaBaseCall) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function callService() {
    setLoading(true)
    try {
      let { data, error } = await supaBaseCall(arguments)
      if (error) {
        setError(error)
      } else {
        setData(data)
      }
    } catch {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { callService, loading, data, error }
}

export default useSuapbaseWithCallback
