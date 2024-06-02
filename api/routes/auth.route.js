import express from 'express';
import { signin, signup } from '../controllers/index.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export { router as authRoute };