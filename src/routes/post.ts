import { Router } from 'express';
import { getPost, createPost, updatePost, deletePost } from '../controllers/post';

const router = Router();

router.get('/', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;