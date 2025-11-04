import express from "express";
import isAuth from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { comment, getAllReels, likedReels, uploadReel } from "../controllers/reels.controllers.js";

const reelRouter = express.Router();

reelRouter.post("/upload",isAuth ,upload.single("media"), uploadReel)
reelRouter.get("/getAllReels",isAuth , getAllReels)
reelRouter.get("/like/:reelId",isAuth , likedReels)
// reelRouter.get("/saved/:postId",isAuth , savedPosts)
reelRouter.post("/comment",isAuth, comment)


export default reelRouter; 