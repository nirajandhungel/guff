import Message from "../models/message.model.js";
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

export const getMessages = async (req, res)=>{
    try{
        const {id:IdOfUserToChat} = req.params;
        const myId= req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:IdOfUserToChat}, // Messages sent by current user
                {senderId:IdOfUserToChat, receiverId:myId}, // Messages received by current user
            ]
        })
        .sort({createdAt:1})
        .populate("senderId","fullName email profileImageUrl ")
        .populate("receiverId","fullName email profileImageUrl ")


        return res.status(200).json({message:"Successfully fetched messages !",messages})

    }catch(err){
        console.log("Error in get Messages", err);
        return res.status(500).json({message:"Internal Server Error "});
    }
}