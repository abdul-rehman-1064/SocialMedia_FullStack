import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();
const app = express();

connectDb(); 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.use((err, req, res, next) => {
    // Check karein ki error mein status code hai ya nahi
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Ab server proper JSON error response bhejega
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})


app.get('/', (req, res) => {
    
  res.send('Hello, World!');
}   );  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});