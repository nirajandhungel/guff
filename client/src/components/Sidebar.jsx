import React, { useEffect } from 'react'
import { Users } from "lucide-react";
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';

const Sidebar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
    const onlineUsers = [];
    useEffect(()=>{
        getUsers();
    },[getUsers]);
    if(isUsersLoading) return <SidebarSkeleton/>;

    console.log("Users in Sidebar ",users);
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className="w-6 h-6"></Users>
                <span className="font-medium hidden lg:block">Contacts</span>
            </div>
            {/* Online filter toggle */}
        </div>
        <div className="overflow-y-auto w-full py-3">
            {users.map((user)=>(
                <button key={user._id} onClick={()=>setSelectedUser(user)} className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300':''}`}>
                    <div className="relative mx-auto lg:mx-0">
                        <img src={user.profileImageURL ||"/avatar.png"} alt={user.fullName} className="w-12 h-12 rounded-full object-cover"/>
                        {onlineUsers.includes(user._id) && (<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 ring-2 ring-zinc-900 rounded-full"></span>
                        )}
                    </div>

                    {/* User info-only visible on larger screens */}
                    <div className="hidden lg:block text-left min-w-0">
                        <div className="font-medium truncate">{user.fullName}</div>
                        <div className="text-sm text-zinc-400">
                            {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                        </div>
                        </div>
                </button>
            ))}
        </div>
    </aside>
  )
}

export default Sidebar
