import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protect = async (req, res, next) => {
  try {
    // get token from cookies
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized -No Token Provided!" });

    // verfify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user using id from decoded
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(400).json({ message: "User not found ! " });

    // attach user to req
    req.user = user;
    next();
  } catch (err) {
    console.log("Error on protect middleware", err);
    res.status(500).json({ message: "Internal server error " });
  }
};
