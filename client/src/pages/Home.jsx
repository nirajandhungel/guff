import React from 'react'
import Sidebar from '../components/Sidebar';
import Welcome from '../components/Welcome';
import ChatBox from '../components/ChatBox';
import { useChatStore } from '../store/useChatStore.js';

const Home = () => {
  const {selecteduser} = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {!selecteduser ? <Welcome/>:<ChatBox/>}
  
            </div>

        </div>

      </div>
    </div>
  )
}

export default Home;