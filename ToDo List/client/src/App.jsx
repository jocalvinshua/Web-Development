import { useState } from "react";
import Login from "./container/login";

export default function App(){
  const [name, setName] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  return(
    <>
    <Login />
    </>
  )
}