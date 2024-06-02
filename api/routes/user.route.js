import express from 'express';
import { test } from '../controllers/index.js';

const router = express.Router();

router.get('/', test);

export { router as userRoute };