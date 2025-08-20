import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

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

export const updateProfile = async (req, res)=> {
    try{
    
    return res.status(200).json({message:"Successfully Logout"});
}catch(err){
    console.log("Error in logout", err)
    return res.status(500).json({message:"Internal Server Error"});

}

}
