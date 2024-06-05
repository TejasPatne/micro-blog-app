import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRoute, postRoute, userRoute } from './routes/index.js';

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cookieParser());


// Connect to MongoDB
mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));
    
app.listen(3000, () => console.log('API listening on port 3000!'));

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});