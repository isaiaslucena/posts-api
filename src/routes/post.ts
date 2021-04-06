import { Router } from 'express';
import { getPost, createPost } from '../controllers/post';

const router = Router();

router.get('/', getPost);
router.post('/', createPost);
router.patch('/:id');
router.delete('/:id');

export default router;