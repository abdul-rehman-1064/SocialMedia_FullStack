import mongoose from "mongoose";

const reelsSchema = new mongoose.Schema({
    author:{
            type: mongoose.Schema.Types.objectId,
            ref: "User",
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

const Reels = mongoose.model("Reels" , reelsSchema);

export default Reels;