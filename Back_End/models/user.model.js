import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImage:{
        type: String,

    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    saved:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    reels:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Reels"
    }],
    story:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Story"
    }

},{ timestamps: true});

const User = mongoose.model("User" , userSchema);

export default User;