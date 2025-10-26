import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Home from './pages/Home.jsx'
import { useSelector } from 'react-redux'
import GetCurrentUser from './hooks/GetCurrentUser.jsx'


export const serverURL = "http://localhost:8000"


function App() {
  GetCurrentUser()
  const {userData} = useSelector(state => state.auth);
  return (
    <Routes>
      <Route path="/signup" element={!userData?<Signup/>:<Navigate to={"/"}/>} />
      <Route path='/signin' element={!userData?<Signin/>:<Navigate to={"/"}/>} />
      <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>} />
      <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>} />
    </Routes>
  )
}

export default App