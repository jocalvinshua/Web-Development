import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'
import { AppContext } from '../context/AppContext';

export default function Layout() {
    const { userData, logout } = useContext(AppContext);
    const navigate = useNavigate()

    const handleLogout = async()=>{
        await logout();
        navigate('/')
    }
    return (
        <>
            <div className='min-h-screen bg-gray-50'>
                <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                    <Link to={'/'}>
                        <img className="h-11 w-auto" src={logo} alt="logo" />
                    </Link>
                    
                    <div className="flex items-center gap-5 text-gray-500">
                        <p className='max-sm:hidden'>
                            Hi, {userData ? userData.name : 'Guest'}!
                        </p>
                        
                        <button 
                            onClick={handleLogout} 
                            className='border border-gray-300 rounded-full text-sm px-4 py-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer'
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    );
};