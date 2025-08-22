import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar } from "../controllers/message.controller.js";
const router = express.Router();
router.get("/users", protect,getUsersForSidebar);
router.get("/:id", protect, getMessages);

export default  router;