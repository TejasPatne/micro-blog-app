import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, getPosts, deletePost, likePost, getPostById } from '../controllers/index.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.put('/like/:id', verifyToken, likePost);
router.get('/', getPosts);
router.get('/:id', getPostById);

export { router as postRoute }