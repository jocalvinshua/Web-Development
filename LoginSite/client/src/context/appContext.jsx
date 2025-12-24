import axios from 'axios'
import { createContext,useEffect,useState } from 'react'
import { toast } from 'react-toastify'

const AppContent = createContext()
export { AppContent } 

export const AppContextProvider = (props) =>{
  const backendUrl = 'http://localhost:3000'
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  const sendVerifyOTP = async ()=>{
    const {response} = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {withCredentials:true})
    
    if(response.status === 200){
      toast.success('OTP sent successfully')
    }
  }

  const checkAuthState = async () =>{
  try {
    const {data} = await axios.get(`${backendUrl}/api/auth/is-auth`,{},{withCredentials:true})
    if(data.success){
      setUserData(data.userData)
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
      setUserData(null)
    }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      setIsLoggedIn(false)
      setUserData(null)
    }
  }

  useEffect(()=>{
    checkAuthState()
  },[])

  const getUserData = async () =>{
    try {
     const { data } = await axios.get(`${backendUrl}/api/user/data`, {withCredentials:true})
    
     if (data.success) {
      setUserData(data.userData)
     } else {
      toast.error(data.message || "Failed to fetch user data")
     }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  }

  const value = {
    backendUrl,
    isLoggedIn, setIsLoggedIn,
    userData,setUserData,
    getUserData,
    checkAuthState,
    sendVerifyOTP
}

return (
 <AppContent.Provider value={value}>
    {props.children}
 </AppContent.Provider>
)
}