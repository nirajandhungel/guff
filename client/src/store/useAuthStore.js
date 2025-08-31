import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import { API_PATHS } from "../lib/apiPaths";
import { toast } from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp:false,
  isLoggingIn :false,
  isUpdatingProfile:false,
  isCheckingAuth: true,
  onlineUsers :[],

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
  },

  signUp: async(data)=>{
    set({isSigningUp:true});
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.SIGN_UP, data);
      if(!res.data){
        throw new Error("Sign up failed");
        
      }
        

      // set the auth user data in the store
     set({ authUser: res.data});


      //success message
      toast.success("Sign up successful")

    } catch (error) {
      console.log("Error in signUp", error);
      toast.error(error.response?.data?.message || "Sign up failed.")
      
    }finally{
      set({isSigningUp:false});
    }

  },

  login: async(data)=>{
    set({isLoggingIn:true});
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);
      if(!res.data){
        throw new Error("Login failed");
        
      }
        

      // set the auth user data in the store
     set({ authUser: res.data});


      //success message
      toast.success("Login successful")

    } catch (error) {
      console.log("Error in Login", error);
      toast.error(error.response?.data?.message || "Login failed.")
      
    }finally{
      set({isLoggingIn:false});
    }

  },

  logout:async()=>{
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
      set({authUser:null});
      toast.success("Logged out successfully")
      
    } catch (error) {
      console.log("Error in logout", error);
      toast.error(error.response?.data?.message || "Logout failed.")
      
    }
    
  },
  updateProfile : async(data)=>{
    set({isUpdatingProfile:true});
    try {
      const formData = new FormData();

      // append profile image if exists
      if(data.profileImage){
        formData.append("profileImage", data.profileImage);
      }
      const res = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      set({authUser:res.data});
      toast.success("Profile updated successfully")
    } catch (error) {
      console.log("Error in update profile", error);
      toast.error(error.response?.data?.message || "Profile update failed.")
      throw error;
      
    }finally{
      set({isUpdatingProfile:false}); 
    }
  }
}));
