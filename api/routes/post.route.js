import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, getPosts } from '../controllers/index.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/', getPosts);

export { router as postRoute }