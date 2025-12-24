import { Fingerprint } from 'lucide-react';
import { useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/appContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EmailVerify (){
    const navigate = useNavigate();
    const inputRefs = useRef([]);

    const { backendUrl, getUserData, userData,isLoggedIn } = useContext(AppContent);

    // Add a useEffect hook to check verification status on load and redirect if needed
    useEffect(() => {
        // Only run this check if the user is logged in
        if (isLoggedIn && userData) {
            // If the user's email is already verified, redirect them to the homepage
            if (userData.isVerified) {
                navigate('/');
            }
        }
    }, [isLoggedIn, userData, navigate])

    // Handle Input
    const handleInput =(e,index)=>{
        if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
            inputRefs.current[index + 1].focus();
        }
    }

    // Handle Key Down
    const handleKeyDown = (e,index) =>{
        if(e.key === 'Backspace' && e.target.value === '' && index > 0){
            inputRefs.current[index - 1].focus();
        }
    }

    // Handle Paste Down
    const handlePasteDown = (e) =>{
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');
        pasteArray.forEach((char,index) => {
            if(inputRefs.current[index]){
                inputRefs.current[index].value = char;
            }
        });
    }

    // Handle Submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const otpArray = inputRefs.current.map(input => input.value);
        const otp = otpArray.join('');

        try {
            const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`,{
                otp,
                email: userData.email // This will now work
            }, { withCredentials: true });

            if(data.success){
                getUserData();
                navigate('/');
                toast.success(data.message);
            } else {
                toast.error(data.message || 'Verification failed.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
            <div className="absolute top-0 left-0 w-full p-4 z-20 flex items-center gap-2" onClick={() => navigate('/')}> 
            <Fingerprint color="#ffffffff" className='w-10 h-10' />
            <span className='text-2xl font-bold text-white'>Auth...</span>
        </div>
            <form onSubmit={handleSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
                <p className='text-center mb-6 text-indigo-300'>Enter the 6 digit code sent to Your email</p>
                <div className='flex justify-between mb-8'>
                    {Array(6).fill(0).map((_,index) =>(
                        <input
                            type='text' 
                            maxLength={1} 
                            key={index} 
                            required 
                            className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                            ref={(e) => (inputRefs.current[index] = e)}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={(e) => handlePasteDown(e)}
                        />
                    ))}
                </div>
                <button 
                    type='submit'
                    className='w-full py-1 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
                    Verify Email
                </button>
            </form>
        </div>
    );
}