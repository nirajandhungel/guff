import React from 'react'
import { Loader } from 'lucide-react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
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

  },[checkAuth]);
  console.log(authUser);

  if(isCheckingAuth && !authUser){
    return <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  } 
  return (
    <div className='text-red-600'>
      hello
      <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/signup" element={<SignUp/>}></Route>
        <Route path ="/login" element={<Login/>}></Route>
        <Route path ="/settings" element={<Settings/>}></Route>
        <Route path ="/profile" element={<Profile/>}></Route>

      </Routes>

      
      
    </div>
  )
}

export default App
