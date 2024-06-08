import express from 'express';
import { createComment, deleteComment, getCommentsOnPost } from '../controllers/index.js';

const router = express.Router();

router.post('/create', createComment);
router.delete('/delete/:id', deleteComment);
router.get('/:id', getCommentsOnPost);

export { router as commentRoute }