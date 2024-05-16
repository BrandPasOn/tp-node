import { Request, Response } from 'express';
import { response } from '../../../utils/response';
import { CategoryService } from '../../../domain/services/CategoryService';
import { CustomRequest } from '../../../types/express';

const categoryService = new CategoryService();

/**
 * Récupère toutes les catégories.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
export const getAllCategories = (req: Request, res: Response) => {
    const categories = categoryService.getAllCategory();
    console.table(categories);
    response(res, {
        statusCode: 200,
        message: 'OK',
        data: categories
    });
};

/**
 * Récupère une catégorie par son titre.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
export const getCategoryByTitle = (req: Request, res: Response) => {
    const title = req.params.title;
    const category = categoryService.getCategoryByTitle(title);
    console.table(category);
    if (!category) {
        response(res, { statusCode: 404, message: 'Category not found' });
    } else {
        response(res, { statusCode: 200, message: 'OK', data: category });
    }
};

/**
 * Crée une nouvelle catégorie.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
export const createCategory = (req: Request, res: Response) => {
    // Récupérer les données de la category à partir du corps de la requête
    const { title } = req.body;

    // Créer un objet Catégory à partir des données récupérées
    const category = { title };

    // Ajouter la category en utilisant le service des categories
    categoryService.addCategory(category);

    // Renvoyer une réponse indiquant que la category a été créé avec succès
    response(res, { statusCode: 201, message: 'Category created successfully' });
};

/**
 * Supprime un commentaire par son id
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 */
export const deleteCategoryById = async (req: CustomRequest, res: Response) => {
    
        const { id } = req.params;
        const { userId } = req.user;
        await categoryService.deleteCategoryById(id, userId);
        response(res, { statusCode: 200, message: 'Comment deleted' });
    
}