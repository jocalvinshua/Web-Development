import { useState, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Lock, Fingerprint } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/appContext.jsx';

export default function ResetPassword(){
    const navigate = useNavigate();
    // Correctly get backendUrl from context
    const { backendUrl } = useContext(AppContent);
    const inputRefs = useRef([]);

    // State to manage the multi-step form:
    // 1: Enter email to get OTP
    // 2: Enter OTP and new password
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Handle Input for OTP fields
    const handleInput = (e, index) => {
        if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
            inputRefs.current[index + 1].focus();
        }
    }

    // Handle Key Down for Backspace in OTP fields
    const handleKeyDown = (e, index) => {
        if(e.key === 'Backspace' && e.target.value === '' && index > 0){
            inputRefs.current[index - 1].focus();
        }
    }

    // Handle Paste for OTP fields
    const handlePasteDown = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if(inputRefs.current[index]){
                inputRefs.current[index].value = char;
            }
        });
    }

    // First step: Submit email to get OTP
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/send-reset-otp`,
                { email },
                { withCredentials: true }
            );

            if(data.success){
                toast.success(data.message);
                setStep(2); // Move to the next step
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    // Second step: Submit OTP and new password
    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(input => input.value);
        const otp = otpArray.join('');

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/reset-password`,
                { email, otp, newPassword },
                { withCredentials: true }
            );

            if(data.success){
                toast.success(data.message);
                navigate('/login'); // Redirect to login after successful reset
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
            {/* The navbar-like element */}
            <div className="absolute top-0 left-0 w-full p-4 z-20 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <Fingerprint color="#ffffffff" className='w-10 h-10' />
                <span className='text-2xl font-bold text-white'>Auth...</span>
            </div>

            {/* Step 1: Enter Email Form */}
            {step === 1 && (
                <form onSubmit={handleEmailSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                    <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
                    <p className='text-center mb-6 text-indigo-300'>Enter Your Registered Email Address</p>
                    <div className="flex items-center bg-transparent border-b border-gray-400 mb-6">
                        <Lock className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Email"
                            className="flex-1 outline-none px-2 py-1 bg-transparent text-white placeholder-gray-400"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Send OTP</button>
                </form>
            )}

            {/* Step 2: Enter OTP and New Password Form */}
            {step === 2 && (
                <form onSubmit={handleOTPSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                    <h1 className='text-white text-2xl font-semibold text-center mb-4'>Enter OTP</h1>
                    <p className='text-center mb-6 text-indigo-300'>Enter the 6 digit code and your new password</p>
                    <div className='flex justify-between mb-8'>
                        {Array(6).fill(0).map((_, index) => (
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
                    <div className="flex items-center bg-transparent border-b border-gray-400 mb-6">
                        <Lock className="text-gray-400" />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="flex-1 outline-none px-2 py-1 bg-transparent text-white placeholder-gray-400"
                            required
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full py-1 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    );
}
