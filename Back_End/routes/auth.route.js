import express from "express";
import { signIn , signOut ,signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register",signUp);
authRouter.post("/login",signIn);
// router.post("/logout",signOut);



export default authRouter;