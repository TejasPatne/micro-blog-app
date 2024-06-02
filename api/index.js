import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRoute, userRoute } from './routes/index.js';

dotenv.config(); 

const app = express();

app.use(express.json());


// Connect to MongoDB
mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));
    
app.listen(3000, () => console.log('API listening on port 3000!'));

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);