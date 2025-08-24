import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import { API_PATHS } from "../lib/apiPaths";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp:false,
  isLoggingIn :false,
  isUpdatingProfile:false,

  isCheckingAuth: true,

  checkAuth:async()=>{
    try {
        const res = await axiosInstance.get(API_PATHS.AUTH.CHECK_AUTH);
        set({authUser:res.data})
    } catch (error) {
        console.log("Error in checking Auth", error);
        set({authUser:null})

        
    }finally{
      set({isCheckingAuth:false})
    }
  }
}));
