import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'

export default function Layout(){
    const user = {name: "Joshua Calvin"}
    const navigate = useNavigate()

    const logoutUser = ()=>{
        navigate('/')
    }
    return (
        <>
            <div className='min-h-screen bg-gray-50'>
                <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                    <Link to={'/'}>
                        <img className="h-11 w-auto" src={logo} alt="dummyLogoColored" />
                    </Link>
                    <div className="flex items-center gap-5 text-gray-500">
                        <p className='max-sm:hidden'>Hi! {user?.name}</p>
                        <button onClick={logoutUser} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                    </div>
                </div>
                <Outlet/>
            </div>
        </>
    );
};