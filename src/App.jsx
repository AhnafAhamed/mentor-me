import './App.css'
import { useEffect } from 'react'
import SignUp from './pages/auth/SignUp'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import PrivatRoute from './navigation/PrivateRoute'

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
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/"
          element={
            <PrivatRoute>
              <div></div>
            </PrivatRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
