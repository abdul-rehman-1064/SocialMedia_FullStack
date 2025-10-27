import express from "express";
import isAuth from "../middlewares/auth.middleware.js";
import { getCurrentUser , suggestedUsers } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current",isAuth , getCurrentUser)
userRouter.get("/suggested",isAuth , suggestedUsers)


export default userRouter;