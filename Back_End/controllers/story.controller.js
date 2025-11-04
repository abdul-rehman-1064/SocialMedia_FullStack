import { apiError } from "../config/apiError";
import uploadOnCloudinary from "../config/cloudinary";
import Story from "../models/story.model";
import User from "../models/user.model";

const uploadStory = async(req,res)=>{
    try {
        const user = await User.findById(req.userId);
        if(user.story){
            await Story.findByIdAndDelete(user.story);
            user.story = null;
            await user.save();
        }

        const {mediaType} = req.body;
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path);
        }else{
            return res.status(400).json({message:"Media file is required"});
        }

        const story = await Story.create({
            author : req.userId,
            mediaType,
            media,
        });
        user.story = story._id;
        await user.save();
        const populatedStory = await Story.findById(story._id).populate("author" , "name username profileImage").populate("viewers" , "name username profileImage");

        return res.status(201).json({
            success:true,
            message:"Story uploaded successfully",
            data: populatedStory,
        });
    } catch (error) {
        new apiError(400 , "Story upload error");
    }
}

const viewStory = async(req,res)=>{
    try {
        const storyId = req.params.storyId;

        const story = await Story.findById(storyId);
        if(!story){
            return res.status(404).json({message:"Story not found"});
        }

        const viewerId = story.viewers.map(id => id.toString());
        if(!viewerId.includes(req.userId.toString())){
            story.viewers.push(req.userId);
            await story.save();
        }

        const populatedStory = await Story.findById(story._id).populate("author" , "name username profileImage").populate("viewers" , "name username profileImage");

        return res.status(200).json({
            success:true,
            message:"Story viewed successfully",
            data: populatedStory,
        });
    } catch (error) {
        new apiError(400 , "Story view error");
    }
}

const getStoryByUserName=  async(req,res)=>{
    try {
        const username = req.params.username;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const story = await Story.find({
            author: user._id
        }).populate("author viewers");
        return res.status(200).json({
            success:true,
            message:"Story fetched successfully",
            data: story,
        });
        
    } catch (error) {
        new apiError(400 , "Get story by username error");
    }
}

export {uploadStory , viewStory , getStoryByUserName};