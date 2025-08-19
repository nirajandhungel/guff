import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();


app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true, // allow cookies

}));
app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);

})