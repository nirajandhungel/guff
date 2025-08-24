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
      hello
      <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/signup" element={<SignUp/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/settings" element={authUser?<Settings/>:<Navigate to = "/login"/>}/>
        <Route path ="/profile" element={authUser?<Profile/>:<Navigate to = "/login"/>}/>

      </Routes>

      
      
    </div>
  )
}

export default App
