import express from "express";
import { passwordReset, sendEmailOTP, signIn , signOut ,signUp, verifiedOTP } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn);
authRouter.post("/sendOtp",sendEmailOTP);
authRouter.post("/verifyOtp",verifiedOTP);
authRouter.post("/resetPassword",passwordReset);
authRouter.get("/signout",signOut);



export default authRouter;