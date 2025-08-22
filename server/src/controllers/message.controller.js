import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res)=>{
    try{
        const currentUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:currentUserId}}).select("-password");
        return res.status(200).json({message:"Successfullly fetched other users"})
    }catch(err){
        console.log("error in message controller", err);
        return res.status(500).json({message:"Internal sever error"})
    }
}