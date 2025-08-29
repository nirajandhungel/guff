import {create} from 'zustand'
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';
import { API_PATHS } from "../lib/apiPaths";

export const useChatStore = create((set) => ({
    chats: [],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers: async () => {
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get(API_PATHS.MESSAGES.GET_USERS);
            set({users:res.data.users});
            console.log("Fetched users in chat store",res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load the users");

        }finally{
            set({isUsersLoading:false});
        }
    },

    getChats: async (userId) => {
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(API_PATHS.MESSAGES.GET_MESSAGES(userId));
            set({chats:res.data.messages});
        } catch (error) {
            console.log(error);
            toast.error("Failed to load the chats");
        }finally{
            set({isMessagesLoading:false});
        }
    },
    // todo: optimize this later
    setSelectedUser: (selectedUser) => set({selectedUser:selectedUser, chats:[]})

    
}))