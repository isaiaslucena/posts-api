import { Router } from 'express';
import { getPost, createPost, updatePost } from '../controllers/post';

const router = Router();

router.get('/', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id');

export default router;