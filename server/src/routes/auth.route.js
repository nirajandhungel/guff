import express from "express";
import upload from "../middleware/multer.js";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put(
  "/update-profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

router.get("/check-auth", protect, checkAuth);

export default router;
