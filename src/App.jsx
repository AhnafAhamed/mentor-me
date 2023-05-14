import './App.css'
import { useEffect } from 'react'
import SignUp from './pages/auth/SignUp'
import { Route, Routes } from 'react-router-dom'

function App() {
  useEffect(() => {
    console.log('hello')
    const arr = {
      hello: 'hell',
      ty: 'ty'
    }
    console.log({ arr })
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
