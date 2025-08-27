import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";

export const signup = async (req, res)=> {

    // Destructuring email ,name etc from body object 
    const {email, fullName, profileImageURL, password} = req.body;

    // Error fo empty fields
    if(!email || !fullName || !password){
        return res.status(400).json({message :"All Fields are Required ! "})
    }

    // Connection to backend
    try{

        // Check if user alread exists 
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User with this email already exists ! "});

        // create new user 
        const user = await User.create({email, fullName, profileImageURL, password})
        if(user){
            const token = generateToken(user._id, res);
            return res.status(200).json({user, token});

        }else{
            return res.status(400).json({message:"Error on user creation ! "});
        }

    }catch(err){
        console.log("Server Error",err);
        return res.status(500).json({message:"Internal Server Error"});
    }

}

export const login = async (req, res)=> {

    // Destructuring email ,name etc from body object 
    const {email, password} = req.body;

    // Error fo empty fields
    if(!email || !password){
        return res.status(400).json({message :"All Fields are Required ! "})
    }

    // Connection to backend
    try{

        // Check if user alread exists 
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid Credentials ! "});

        const isValidPassword = await user.comparePassword(password);
        if(!isValidPassword) return res.status(400).json({message:"Invalid Password"})

        // loging the user 

            const token = generateToken(user._id, res);
            return res.status(200).json({_id:user._id, email: user.email, fullName: user.fullName, profileImageURL:user.profileImageURL, token});


    }catch(err){
        console.log("Server Error",err);
        return res.status(500).json({message:"Internal Server Error"});
    }

}

export const logout = async (req, res)=> {
    try{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:process.env.NODE_ENV ==='production'? "none":"lax",
        secure:process.env.NODE_ENV ==='production',
    })
    return res.status(200).json({message:"Successfully Logout"});
}catch(err){
    console.log("Error in logout", err)
    return res.status(500).json({message:"Internal Server Error"});

}

}


export const updateProfile = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user._id;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

        // Validate file type
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: "Please upload an image file" });
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "File size should be less than 5MB" });
    }

       // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "Guff/Users",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileImageURL: result.secure_url,
        profileImagePublicId: result.public_id,
      },
      {
        new: true,
        select: "-password", // exclude password
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error in update profile:", err);
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: err.message 
    });
  }
};

// Auth check controller

export const checkAuth = (req, res)=>{
    try{
        return res.status(200).json(req.user);
    }catch(err){
        console.log("Error in checkAuth controller",err.message);
        return res.status(500).json({message:"Internal Server Error"})
    }

}
