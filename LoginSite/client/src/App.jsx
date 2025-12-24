import { Routes, Route } from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { ToastContainer } from 'react-toastify'
import EmailVerify from "./pages/EmailVerify.jsx"

import bg_img from './assets/bg_img.jpg'

import './App.css'

export default function App(){
  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg_img})` }}>
      <ToastContainer/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/EmailVerify" element={<EmailVerify/>}/>
      </Routes>
    </div>
  )
}