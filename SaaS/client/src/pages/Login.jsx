import React, { useState, useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Mail, Lock, User, LogIn, UserPlus, ArrowRight } from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const [searchParams] = useSearchParams();
  const { handleLogin, handleRegister } = useContext(AppContext);
  
  const [state, setState] = useState(searchParams.get("state") || "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({ name: "", email: "", password: "" });
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === "login") {
      await handleLogin({ email: formData.email, password: formData.password });
      console.log("Login Successfully")
    } else {
      await handleRegister(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
          <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
          {state !== "login" && (
              <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <User size={13}/>
                  <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
              </div>
          )}
          <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <Mail size={13}/>
              <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <Lock size={13}/>
              <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mt-4 text-left text-indigo-500">
              <button className="text-sm" type="reset">Forget password?</button>
          </div>
          <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
              {state === "login" ? "Login" : "Sign up"}
          </button>
          <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-indigo-500 hover:underline">click here</a></p>
      </form>
    </div>
  );
}