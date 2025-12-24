import { useContext, useState } from "react"
import { User, Mail, Lock } from "lucide-react" 
import { useNavigate } from "react-router-dom"
import { AppContent } from "../context/appContext.jsx"
import { toast } from 'react-toastify'
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

    const [state, setState] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // axios.defaults.withCredentials = true; // This line is no longer necessary if you pass the option below

            if (state === "Sign Up") {
                const { data } = await axios.post(
                    `${backendUrl}/api/auth/register`, 
                    { username, email, password },
                    { withCredentials: true }
                );
                if(data.success) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(
                    `${backendUrl}/api/auth/login`,
                    { email, password },
                    { withCredentials: true }
                );
                if(data.success) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            // Display the specific error message from the backend
            toast.error(error.response?.data?.message || "An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 bg-gradient-to-br from-blue-200 to-purple-400 ">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 relative">
                <h2 className="text-2xl font-bold mb-2 text-center text-white">{state === 'Sign Up' ? "Create Account" : "Login"}</h2>
                <p className="text-center text-gray-300 mb-6">{state === 'Sign Up' ? "Create Your account" : "Welcome back!"}</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {state === "Sign Up" && (
                        <div className="flex items-center border border-gray-300 rounded-xl p-2
                            focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-gray-700">
                            <User className="text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="flex-1 outline-none px-2 py-1 bg-transparent text-white placeholder-gray-400"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="flex items-center border border-gray-300 rounded-xl p-2
                        focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-gray-700">
                        <Mail className="text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="flex-1 outline-none px-2 py-1 bg-transparent text-white placeholder-gray-400"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-xl p-2
                        focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-gray-700">
                        <Lock className="text-gray-400" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="flex-1 outline-none px-2 py-1 bg-transparent text-white placeholder-gray-400"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        {state === "Sign Up" ? "Create Account" : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-300">
                    {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"} 
                    <span 
                        onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")} 
                        className="text-indigo-400 cursor-pointer hover:underline"
                    >
                        {state === "Sign Up" ? " Login" : " Sign Up"}
                    </span>
                </p>
                {state === "Login" && (
                    <p className="mt-2 text-sm text-center text-gray-300">
                        <span 
                            onClick={() => navigate('/ResetPassword')} 
                            className="text-indigo-400 cursor-pointer hover:underline"
                        >
                            Forgot Password?
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}