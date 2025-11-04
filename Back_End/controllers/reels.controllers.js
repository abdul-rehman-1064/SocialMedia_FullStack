import { apiError } from "../config/apiError";
import uploadOnCloudinary from "../config/cloudinary";
import Post from "../models/post.model.js";
import Reels from "../models/reels.models.js";
import User from "../models/user.model.js";

const uploadReel = async(req , res) =>{
    try {
        const {caption} =req.body;
        let media ;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path);

        }else{
            return res.status(400).json({message : "Media file is required"});
        }
        const reel = new Reels.create({
            caption,
            media,
            author : req.userId

        })

        const user = await User.findById(req.userId);
        user.reels.push(reel._id);
        await user.save();

        const populatedReel = await Reels.findById(reel._id).populate("author" , "name username profileImage")

        return res.status(201).json({
            success : true,
            message : "Reel created successfully",
            data : populatedReel,
        });


    } catch (error) {
        
        throw new apiError(400, "Reel Creation error");
    }
}


const likedReels =  async(req,res)=>{
    try {
        const reelId = req.params.reelId;
        const findReel = await Reels.findById(reelId)
        if(!findReel){
            return res.status(404).json({message:"Reel not found"});
        }
        const alreadyLiked = findReel.likes.some(id=>id.toString() === req.userId.toString());
        if(alreadyLiked){
            findReel.likes = findReel.likes.filter(id=>id.toString() !== req.userId.toString());
            await findReel.save();
            findReel.populate("author" , "name username profileImage");
            return res.status(200).json({success:true, message:"Reel unliked successfully",data:findPost});
        }
        findReel.likes.push(req.userId);
        await findReel.save();
        findReel.populate("author" , "name username profileImage");
        return res.status(200).json({success:true, message:"Reel liked successfully",data:findReel});

        
    } catch (error) {
            throw new apiError(400, "Liked Post error");
        
    }
}

const comment = async(req,res)=>{
    try {
        const {message} = req.body;
        const reelId =  req.params.reelId;
        const findReel = await Reels.findById(reelId);
        if(!findReel){
            return res.status(404).json({message:"Reel not found"});
        }
        findReel.comments.push({
            author:req.userId,
            message
        })
        await findReel.save();
        findReel.populate("author" , "name username profileImage"),
        findReel.populate("comments.author");
        return res.status(200).json({
            success:true,
            message:"Comment added successfully",
            data:findReel,});

    } catch (error) {
        throw new apiError(400, "Comment Reel error");
    }
}


const getAllReels = async(req,res)=>{
        try {
            const reel = await Reels.find({}).populate("author" , "name username profileImage").populate("comments.author");
            return res.status(200).json({
                success:true,
                data:reel,
            });
        } catch (error) {
            throw new apiError(400, "Get all Reel error");
        }
}

export {uploadReel , likedReels , comment , getAllReels};