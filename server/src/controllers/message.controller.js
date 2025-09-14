import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";
import mongoose from "mongoose";


export const getUsersForSidebar = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: currentUserId },
    }).select("-password");
    return res
      .status(200)
      .json({ message: "Successfullly fetched other users", users: filteredUsers });
  } catch (err) {
    console.log("error in message controller", err);
    return res.status(500).json({ message: "Internal sever error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: IdOfUserToChat } = req.params;
    const myId = req.user._id;



    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: IdOfUserToChat }, // use raw string comparison
        { senderId: IdOfUserToChat, receiverId: myId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "fullName email profileImageURL")
      .populate("receiverId", "fullName email profileImageURL");


    return res
      .status(200)
      .json({ message: "Successfully fetched messages!", messages });
  } catch (err) {
    console.error("Error in getMessages:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { message, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;

    // Debugging logs
     console.log('Request body:', { message, image: image ? 'present' : 'not present' });
    console.log('Receiver ID:', receiverId);
    console.log('Sender ID:', senderId);


    // validation
    if (!message && !image) {
      return res.status(400).json({ message: "Message or image is required" });
    }

    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: `${senderId}-chatImages`,
      });
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message: message || "",
      image: imageUrl,
    });
    await newMessage.save();
     const populatedMessage = await newMessage.populate(
      "senderId receiverId",
      "fullName email profileImageURL"
    );

    // todo: real time functionality =>socket.io
    // return res.status(201).json({message:populatedMessage});
       return res.status(201).json({ message: "Message sent successfully", message: populatedMessage });

  } catch (err) {
    console.log("Error in send message", err);
    return res.status(500).json({ message: "Internal Server Error " });
  }
};
