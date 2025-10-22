import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/auth.route.js';

dotenv.config();
const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   withCredentials: true,
// }))
// app.use(express.json());
// app.use(cookieParser());

// // app.use('/api/auth',authRouter)


app.get('/', (req, res) => {
    connectDb(); 
  res.send('Hello, World!');
}   );  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});