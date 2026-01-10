import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'lucide-react';
import Login from './Login';
import { logout } from '../app/features/authSlice.js';

export default function Layout() {
    const { user, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (loading) {
        return <div className='flex h-screen items-center justify-center'><Loader className='animate-spin' /></div>
    }

    const logoutUser = () => {
        navigate('/')
        dispatch(logout())
    }

    return (
        <>
            {user ? (
                <div className='min-h-screen bg-gray-50'>
                    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                        <Link to={'/'}>
                            <img className="h-11 w-auto" src={logo} alt="logo" />
                        </Link>
                        
                        <div className="flex items-center gap-5 text-gray-500">
                            <p className='max-sm:hidden'>
                                Hi, {user?.name || 'Guest'}!
                            </p>
                            
                            <button 
                                onClick={logoutUser} 
                                className='border border-gray-300 rounded-full text-sm px-4 py-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer'
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <Outlet />
                </div>
            ) : (
                <Login />
            )}
        </>
    )
}