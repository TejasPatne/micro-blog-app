import express from 'express';
import { test, updateUser, deleteUser, bookmarkPost } from '../controllers/index.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.put('/bookmark/:id', verifyToken, bookmarkPost);

export { router as userRoute };