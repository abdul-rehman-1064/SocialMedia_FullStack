
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import webToken from "../config/jsonwebtoken.js";
import { apiError } from "../config/apiError.js";
import sendOTP from "../config/mail.js";


const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (
      [name, email, username, password].some(
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
                password: user.password,
            },
            token: genToken,
        },
    }); 

  } catch (error) {
    throw new apiError(500, `| ${error}`);
  }
};




const signIn = async (req, res) => {
  try {
    const {  username, password } = req.body;

    if (
      [username, password].some(
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
    
    

    const genToken = await webToken(existedUser._id);

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
    throw new apiError(500, `| ${error}`);
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
        throw new apiError(500, `| ${error} `); 
    }
}


const sendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(404, "User with this email does not exist");
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; 
    user.isOtpVerified = false;

    await user.save();

    await sendOTP(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email successfully",
    });

  } catch (error) {
    throw new apiError(500, `| ${error}`);
  }
};

const verifiedOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

   
    if (!user || !user.resetOtp || !user.otpExpiry) {
       throw new apiError(400, "OTP required or already expired. Please re-send OTP.");
  }
    
     if (user.resetOtp !== otp) {
      throw new apiError(400, "Invalid OTP");
    }
    
   if (user.otpExpiry < Date.now()) { 
     throw new apiError(400, "OTP has expired");
   }

    const storedOtpValue = user.resetOtp ? user.resetOtp.trim() : null; 
    console.log(storedOtpValue);
    
    const inputOtpValue = otp ? otp.trim() : null; 
    console.log("input " , inputOtpValue);  
    

   if (storedOtpValue !== inputOtpValue) {
    throw new apiError(400, "Invalid OTP"); 
   }
   

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  }
  catch (error) {
    
    if (error instanceof apiError) {
        throw error; // Throw 400/404 errors with the specific message
    }
    // Log unexpected errors
    console.error("VERIFY OTP UNEXPECTED ERROR:", error);
    throw new apiError(500, `Verify OTP : Internal Server Error.`);
    
    
  }
};


const passwordReset = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(404, "User with this email does not exist");
    }
    if (!user.isOtpVerified) {
      throw new apiError(400, "OTP not verified");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    throw new apiError(500, `Password Reset : Something went wrong  ${error}`);
  }
};

export { signUp , signIn , signOut , sendEmailOTP , verifiedOTP , passwordReset };
