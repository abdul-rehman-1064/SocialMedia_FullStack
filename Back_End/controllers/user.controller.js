import { apiError } from "../config/apiError.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: `Server Error! get current User Error ${error}` });
    }   
};

const suggestedUsers = async (req,res) =>{
    try {
        const users = await User.find({
            _id: { $ne: req.userId }
        }).select("-password")
        res.status(200).json({success:true, data:users});

    } catch (error) {
        throw new apiError (500, `Server Error! suggested Users Error ${error}`);
    }
}

const editUserProfile = async (req,res) =>{
    try {
        const {name,username,bio,profession} = req.body;
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            throw new apiError (404, "User not found");
        }

        const userNameExists = await User.findOne({username:username}).select("-password");
        if(userNameExists && userNameExists._id.toString() !== userId){
            throw new apiError (400, "Username already taken , please choose another username");
        }

        let profileImage ;
        if(req.file){
            profileImage = await uploadOnCloudinary(req.file.path);
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.profession = profession || user.profession;
        user.profileImage = profileImage || user.profileImage;

        await user.save();

        res.status(200).json({success:true, data:user});

    } catch (error) {
        throw new apiError (500, `Server Error! edit User Profile Error ${error}`);
    }
}

const getUserByUsername = async (req,res) => {
    try {
        const {username} = req.params;
        const user = await User
        .findOne({ username: username })
        .select("-password");
        if(!user){
        throw new apiError(404, "User not found");
    }

        return res.status(200).json(user);
    }
    catch (error) {
        throw new apiError(500, `Server Error! get User By Username Error ${error}`);
    }
};

export {getCurrentUser ,  suggestedUsers , editUserProfile , getUserByUsername};