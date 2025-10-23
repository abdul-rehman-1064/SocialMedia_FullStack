import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOTP = async (sendTo,otp)=>{
    transporter.sendMail({
        from:process.env.EMAIL,
        sendTo,
        subject:"Your Password Reset OTP",
        html:`<p>Your OTP for password reset is <b>${otp}</b>. It is valid for 5 minutes only.</p>`

    })
}


export default sendOTP;
