import express from 'express';
import { createComment, deleteComment } from '../controllers/index.js';

const router = express.Router();

router.post('/create', createComment);
router.delete('/delete/:id', deleteComment);

export { router as commentRoute }