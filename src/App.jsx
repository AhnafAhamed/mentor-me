import './App.css'
import SignUp from './pages/auth/SignUp'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import PrivatRoute from './navigation/PrivateRoute'
import HomeMentee from './pages/home/HomeMentee'
import Messages from './pages/messages/Messages'
import Settings from './pages/settings/Settings'
import Profile from './pages/profile/Profile'
import useUserStore from './store/userStore'
import HomeMentor from './pages/home/HomeMentor'
import LogOut from './pages/auth/Logout'
import BookingsMentee from './pages/bookings/BookingsMentee'
import BookingsMentor from './pages/bookings/BookingsMentor.jsx'
import Mentors from './pages/mentors/Mentors'
import MentorProfile from './pages/mentors/MentorProfile'
import ResourcesMentee from './pages/resources/ResourcesMentee'
import ResourcesMentor from './pages/resources/ResourcesMentor'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import Stats from './pages/stats/Stats.jsx'
import MessagesMentee from './pages/messages/MessagesMentee.jsx'
import MessagesMentor from './pages/messages/MessagesMentor.jsx'
import { useEffect } from 'react'

function App() {
  const { user } = useUserStore()
  const navigate = useNavigate()

  const NavigateToHome = () => {
    useEffect(() => {
      navigate('/home')
    }, [])
  }

  return (
    <div>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<NavigateToHome />} />
        <Route
          path="/home"
          element={
            <PrivatRoute>
              {user?.user_metadata.role === 'mentee' ? (
                <HomeMentee />
              ) : (
                <HomeMentor />
              )}
            </PrivatRoute>
          }
        />
        <Route
          path="/messages/:id"
          element={
            <PrivatRoute>
              {user?.user_metadata.role === 'mentee' ? (
                <MessagesMentee />
              ) : (
                <MessagesMentor />
              )}
            </PrivatRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivatRoute>
              {user?.user_metadata.role === 'mentee' ? (
                <ResourcesMentee />
              ) : (
                <ResourcesMentor />
              )}
            </PrivatRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <PrivatRoute>
              {user?.user_metadata.role === 'mentee' ? (
                <BookingsMentee />
              ) : (
                <BookingsMentor />
              )}
            </PrivatRoute>
          }
        />
        <Route
          path="/mentors"
          element={
            <PrivatRoute>
              <Mentors />
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
        <Route
          path="mentors/:userId"
          element={
            <PrivatRoute>
              <MentorProfile />
            </PrivatRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivatRoute>
              <Stats />
            </PrivatRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
