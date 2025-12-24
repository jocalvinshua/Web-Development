import { Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from "../context/appContext.jsx";
import { useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

    // Handle Verify Toggle. Send OTP
    const verifyEmail = async() => {
        try {
            const {data} = await axios.post(
                `${backendUrl}/api/auth/send-verify-otp`, 
                { email: userData.email },
                { withCredentials: true }
            );
        
            if(data.success){
                navigate('/EmailVerify');
                toast.success(data.message);
            } else {
                toast.error(data.message || 'Failed to send verification email.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Handle LogOut Toggle
    const logOut = async () =>{
        try {
            const {data} = await axios.post(
                `${backendUrl}/api/auth/logout`,
                {},
                { withCredentials: true }
            );

            // Check for success flag before updating state
            if (data.success) {
                setIsLoggedIn(false);
                setUserData(null); // Set to null for a clean state
                toast.success("Logged out successfully!");
                navigate('/login'); // Redirect to login page
            } else {
                toast.error(data.message || "Logout failed.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <nav className='w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 absolute top-0 z-50'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
                <Fingerprint color="#ffffffff" className='w-10 h-10' />
                <span className='text-2xl font-bold text-white'>Auth...</span>
            </div>
            {userData ? 
            <div className='w-10 h-10 flex justify-center items-center rounded-full bg-black text-white relative group'>
                {userData?.name?.[0]?.toUpperCase() || 'U'}
                <div className='absolute hidden group-hover:block top-full right-0 z-10 text-black rounded'>
                    <ul className='list-none m-0 p-2 bg-gray-100 text-sm shadow-md min-w-[100px]'>
                        {!userData.isVerified && 
                        <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={verifyEmail}>Verify</li>
                        }
                        <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={logOut}>LogOut</li>
                    </ul>
                </div>
            </div>
            :
            <div className='flex items-center gap-2 border border-indigo-600 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'
                 onClick={() => navigate('/login')}>
                <span className='text-sm font-semibold text-white hover:text-indigo-900'>Login</span>
            </div>
            }
        </nav>
    );
}
