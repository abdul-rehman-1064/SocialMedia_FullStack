import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

export const serverURL = "http://localhost:8000"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
    </Routes>
  )
}

export default App