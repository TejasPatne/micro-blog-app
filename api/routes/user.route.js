import express from 'express';
import { test, updateUser } from '../controllers/index.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.put('/update/:id', verifyToken, updateUser);

export { router as userRoute };