import express from "express";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/users", protect);

export default  router;