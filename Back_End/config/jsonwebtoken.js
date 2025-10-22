
import jwt from "jsonwebtoken";
import { apiError } from "../config/apiError.js";

const webToken = async(userId)=>{
try {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
} catch (error) {
    throw new apiError(500, "JWT : Something went wrong");
}
}

export default webToken