import express from 'express';
import { signup } from '../controllers/index.js';

const router = express.Router();

router.post('/signup', signup);

export { router as authRoute };