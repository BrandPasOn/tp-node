import express from 'express';
import articleRoutes from './articleRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/article', articleRoutes);
router.use('/users', userRoutes);

export default router;