import express from 'express';
import { getAllCategories, getCategoryByTitle, createCategory, deleteCategoryById } from '../controllers/CategoryController';
import { isAuth } from '../../../middlewares/isAuth';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:title', getCategoryByTitle)
router.get('/create', isAuth, createCategory)
router.get('/delete/:id', isAuth, deleteCategoryById)

export default router;