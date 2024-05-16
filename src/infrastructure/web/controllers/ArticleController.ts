import { Request, Response } from 'express';
import { ArticleService } from '../../../domain/services/ArticleService';
import { response } from '../../../utils/response';
import { Article } from '../../../domain/entities/Article';
import { CustomRequest } from '../../../types/express';

const articleService = new ArticleService();

/**
 * Récupère tous les articles.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
export const getAllArticles = (req: Request, res: Response) => {
    const articles = articleService.getAllArticles();
    console.table(articles);
    response(res, {
        statusCode: 200,
        message: 'OK',
        data: articles
    });
};

/**
 * Récupère un article par son titre.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
export const getArticleByTitle = (req: Request, res: Response) => {
    const title = req.params.title;
    const article = articleService.getArticleByTitle(title);
    console.table(article);
    if (!article) {
        response(res, { statusCode: 404, message: 'Article not found' });
    } else {
        response(res, { statusCode: 200, message: 'OK', data: article });
    }
};

/**
 * Crée un nouvel article et l'associe à l'utilisateur qui l'a créé.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
export const createArticle = (req: CustomRequest, res: Response) => {
    // Récupérer les données de l'article à partir du corps de la requête
    const { title, content, categorieId } = req.body;

    // Récupérer l'ID de l'utilisateur à partir de l'objet req (peut être ajouté par le middleware d'authentification)
    const {userId} = req.user;

    if (!userId) {
        return response(res, { statusCode: 401, message: 'Unauthorized' });
    }


    // Créer un objet Article à partir des données récupérées
    const article = { title, content, author: userId, category: categorieId };

    // Ajouter l'article en utilisant le service d'articles
    articleService.addArticle(article);

    // Renvoyer une réponse indiquant que l'article a été créé avec succès
    response(res, { statusCode: 201, message: 'Article created successfully' });
};

/**
 * Supprime un article par son id
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 */
export const deleteArticleById = async (req: CustomRequest, res: Response) => {
    
        const { id } = req.params;
        const { userId } = req.user;
        await articleService.deleteArticleById(id);
        response(res, { statusCode: 200, message: 'Comment deleted' });
    
}
