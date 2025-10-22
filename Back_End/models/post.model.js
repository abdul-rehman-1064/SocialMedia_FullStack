import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.objectId,
        ref: "User",
        required: true,
    },
    mediaType:{
        type: String,
        enum:["image" , "video"],
        required: true,
    },
    media:{
        type: String,
        required: true,
    },
    caption:{
        type: String,
        maxLength: 300,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]                 

},{ timestamps: true});

const Post = mongoose.model("Post" , postSchema);

export default Post;