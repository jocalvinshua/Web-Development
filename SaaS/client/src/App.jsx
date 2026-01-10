import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login"

import { useDispatch } from "react-redux";

import './index.css'
import { Route, Routes } from "react-router-dom";
import { setLoading, login, logout } from "./app/features/authSlice.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"
import api from './config/api.js'

export default function App(){
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      if(token){
          const {data} = await api.get("/api/user/data", {headers: {Authorization: token}});
          if (data?.success) {
          dispatch(login({token, user: data.user}))
          dispatch(setLoading(false))
        }
        else{
          dispatch(setLoading(false))
        }
      }
      
    } catch (error) {
      dispatch(setLoading(false))
      console.error("Fetch user error:", error);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, []);

  return (
    <>
      <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          </Route>
        </Routes>
    </>
  );
}