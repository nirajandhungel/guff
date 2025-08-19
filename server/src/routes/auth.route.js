import express from "express";
const router = express.Router()
router.post("/signup",signUpRoute)
router.post("/login",signUpRoute)
router.post("/logout",signUpRoute)
export default function signUpRoute(){

}