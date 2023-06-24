import './App.css'
import { useEffect } from 'react'
import SignUp from './pages/auth/SignUp'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import PrivatRoute from './navigation/PrivateRoute'
import Home from './pages/home/Home'
import Messages from './pages/messages/Messages'
import Resources from './pages/resources/Resources'
import Settings from './pages/settings/Settings'
import Profile from './pages/profile/Profile'

function App() {
  useEffect(() => {}, [])

  return (
    <div>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/"
          element={
            <PrivatRoute>
              <Home />
            </PrivatRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivatRoute>
              <Messages />
            </PrivatRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivatRoute>
              <Resources />
            </PrivatRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivatRoute>
              <Settings />
            </PrivatRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivatRoute>
              <Profile />
            </PrivatRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
