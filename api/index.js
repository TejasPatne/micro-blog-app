import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => console.log('API listening on port 3000!'));