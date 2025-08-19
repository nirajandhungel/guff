import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import dbConfig from "./config/db.config.js";
const app = express();


app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true, // allow cookies

}));
app.use(cookieParser());
app.use(express.json());

dbConfig();

app.use("/api/auth",authRoutes);

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);

})