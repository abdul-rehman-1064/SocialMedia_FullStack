import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Home from './pages/Home.jsx'
import { useSelector } from 'react-redux'


export const serverURL = "http://localhost:8000"

function App() {

  const {userData} = useSelector(state => state.auth);
  return (
    <Routes>
      <Route path="/signup" element={!userData?<Signup/>:<Home/>} />
      <Route path='/signin' element={!userData?<Signin/>:<Home/>} />
      <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Home/>} />
      <Route path='/' element={userData?<Home/>:<Signin/>} />
    </Routes>
  )
}

export default App