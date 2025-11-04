import express from "express";
import isAuth from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { comment, getAllPosts, likedPosts, savedPosts, uploadPost } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post("/upload",isAuth ,upload.single("media"), uploadPost)
postRouter.get("/getAllPosts",isAuth , getAllPosts)
postRouter.get("/like/:postId",isAuth , likedPosts)
postRouter.get("/saved/:postId",isAuth , savedPosts)
postRouter.post("/comment",isAuth, comment)


export default postRouter;