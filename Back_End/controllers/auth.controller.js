
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import webToken from "../config/jsonwebtoken.js";
import { apiError } from "../config/apiError.js";


const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (
      [fullName, email, username, password].some(
        (values) => values?.trim() === ""
      )
    ) {
      throw new apiError(400, "All feilds are required");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new apiError(409, "User with email or username already exists");
    //   return res.status(409).json({ message: "User with email or username already exists" });   
    }

    if(password.length < 6){
        throw new apiError(400, "Password must be at least 6 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
    })

    const genToken = await webToken(user._id);

    res.cookie("token", genToken, {
        httpOnly: true,
        maxage: 10*365*24*60*60*1000,
        secure:false,
        sameSite:"Strict",

    });

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
            user:{
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email, 
            },
            token: genToken,
        },
    }); 

  } catch (error) {
    throw new apiError(500, "User SignUp : Something went wrong");
  }
};




const signIn = async (req, res) => {
  try {
    const {  username, password } = req.body;

    if (
      [fullName, email, username, password].some(
        (values) => values?.trim() === ""
      )
    ) {
      throw new apiError(400, "All feilds are required");
    }
    

    const existedUser = await User.findOne({
      username,
    });

    if (!existedUser) {
      throw new apiError(409, "User with username not found ");
    //   return res.status(409).json({ message: "User with email or username already exists" });   
    }

    const ismatched = await bcrypt.compare(password, existedUser.password);

    if(!ismatched){
        throw new apiError(400, "Invalid credentials! Password does not match");
    }
    
    

    const genToken = await webToken(user._id);

    res.cookie("token", genToken, {
        httpOnly: true,
        maxage: 10*365*24*60*60*1000,
        secure:false,
        sameSite:"Strict",

    });

    res.status(200).json({
        success: true,
        message: "User login successfully",
        data: {
            user:{
                _id: existedUser._id,
                name: existedUser.name,
                username: existedUser.username,
                email: existedUser.email, 
            },
            token: genToken,
        },
    }); 

  } catch (error) {
    throw new apiError(500, "User SignUp : Something went wrong");
  }
};


const signOut = async (req, res) => {
    try {
        res.clearCookie("token",{
        httpOnly: true,
        expires: new Date(Date.now()),
        secure:false,
        sameSite:"Strict",
    });
    res.status(200).json({
        success: true,
        message: "User signed out successfully",
    });
    } catch (error) {
        throw new apiError(500, "User SignOut : Something went wrong"); 
    }
}

export { signUp , signIn , signOut };
