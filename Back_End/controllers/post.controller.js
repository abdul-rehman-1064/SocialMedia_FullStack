import { apiError } from "../config/apiError";
import uploadOnCloudinary from "../config/cloudinary";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const uploadPost = async(req , res) =>{
    try {
        const {caption , mediaType } =req.body;
        let media ;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path);

        }else{
            return res.status(400).json({message : "Media file is required"});
        }
        const post = new Post.create({
            caption,
            media,
            mediaType,
            author : req.userId

        })

        const user = await User.findById(req.userId);
        user.post.push(post._id);
        await user.save();

        const populatedPost = await Post.findById(post._id).populate("author" , "name username profileImage")

        return res.status(201).json({
            success : true,
            message : "Post created successfully",
            data : populatedPost,
        });


    } catch (error) {
        
        throw new apiError(400, "Post Creation error");
    }
}

const getAllPosts = async(req,res)=>{
        try {
            const posts = await Post.find({author:req.userId}).populate("author" , "name username profileImage");
            return res.status(200).json({
                success:true,
                data:posts,
            });
        } catch (error) {
            throw new apiError(400, "Get all Post error");
        }
}


const likedPosts =  async(req,res)=>{
    try {
        const postId = req.params.postId;
        const findPost = await Post.findById(postId)
        if(!findPost){
            return res.status(404).json({message:"Post not found"});
        }
        const alreadyLiked = findPost.likes.some(id=>id.toString() === req.userId.toString());
        if(alreadyLiked){
            findPost.likes = findPost.likes.filter(id=>id.toString() !== req.userId.toString());
            await findPost.save();
            findPost.populate("author" , "name username profileImage");
            return res.status(200).json({success:true, message:"Post unliked successfully",data:findPost});
        }
        findPost.likes.push(req.userId);
        await findPost.save();
        findPost.populate("author" , "name username profileImage");
        return res.status(200).json({success:true, message:"Post liked successfully",data:findPost});

        
    } catch (error) {
            throw new apiError(400, "Liked Post error");
        
    }
}

const comment = async(req,res)=>{
    try {
        const {message} = req.body;
        const postId =  req.params.postId;
        const findPost = await Post.findById(postId);
        if(!findPost){
            return res.status(404).json({message:"Post not found"});
        }
        findPost.comments.push({
            author:req.userId,
            message
        })
        await findPost.save();
        findPost.populate("author" , "name username profileImage"),
        findPost.populate("comments.author");
        return res.status(200).json({
            success:true,
            message:"Comment added successfully",
            data:findPost,});

    } catch (error) {
        throw new apiError(400, "Comment Post error");
    }
}

const savedPosts = async(req,res)=>{
   try {
        const postId = req.params.postId;
        const user = await User.findById(req.userId);
        
        const alreadySaved = user.saved.some(id=>id.toString() === postId.toString());
        if(alreadySaved){
            user.saved = user.saved.filter(id=>id.toString() !== postId.toString());
        }
        else{
            user.saved.push(postId);
        }
        await user.save();
        user.populate("saved");
        res.status(200).json({success:true, message:"Post saved successfully", data:user});   

        
    } catch (error) {
            throw new apiError(400, "Saved Post error");
        
    }
}



export {uploadPost , getAllPosts , likedPosts , comment ,  savedPosts};