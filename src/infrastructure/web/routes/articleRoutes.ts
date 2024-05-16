import express from 'express';
import { getAllArticles, getArticleByTitle, createArticle, deleteArticleById } from '../controllers/ArticleController';
import { isAuth } from '../../../middlewares/isAuth';

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:title', getArticleByTitle)
router.get('/create', isAuth, createArticle)
router.get('/delete/:id', isAuth, deleteArticleById)

export default router;