import React from 'react'
import { Loader } from 'lucide-react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  React.useEffect(()=>{
    checkAuth()

  },[]); // Run once on mount
  console.log(authUser);

  if(isCheckingAuth && !authUser){
    return <div className='flex items-center justify-center h-screen'>
      <Loader className="w-10 h-10 animate-spin"></Loader>
    </div>
  } 
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path ="/" element={authUser?<Home/>:<Navigate to = "/login"/>}/>
        <Route path ="/signup" element={!authUser?<SignUp/>:<Navigate to = "/"/>}/>
        <Route path ="/login" element={!authUser?<Login/>:<Navigate to = "/"/>}/>
        <Route path ="/settings" element={<Settings/>}/>
        <Route path ="/profile" element={authUser?<Profile/>:<Navigate to = "/login"/>}/>

      </Routes>
      <Toaster position="top-right"/>

      
      
    </div>
  )
}

export default App
