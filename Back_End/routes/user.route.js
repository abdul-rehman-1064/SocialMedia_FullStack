import express from "express";
import isAuth from "../middlewares/auth.middleware.js";
import { editUserProfile, getCurrentUser , suggestedUsers , getUserByUsername} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/current",isAuth , getCurrentUser)
userRouter.get("/suggested",isAuth , suggestedUsers)
userRouter.get("/getProfile/:username",isAuth , getUserByUsername)
userRouter.post("/updateProfile",isAuth,upload.single("profileImage"), editUserProfile)


export default userRouter;