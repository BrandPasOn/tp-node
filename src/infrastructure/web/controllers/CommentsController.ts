import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { CommentService } from "../../../domain/services/CommentService";
import { CustomRequest } from "../../../types/express";

const commentService = new CommentService();

/**
 * Affiches les commentaire d'un article
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 */
export const getCommentsByArticleId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comments = await commentService.getCommentByArticleId(id);
    console.table(comments)
    response(res, { statusCode: 200, data: comments, message: 'OK' });
};

/**
 * Supprime un commentaire par son id
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 */
export const deleteCommentById = async (req: CustomRequest, res: Response) => {
    
        const { id } = req.params;
        const { userId } = req.user;
        await commentService.deleteCommentById(id, userId);
        response(res, { statusCode: 200, message: 'Comment deleted' });
    
}

/**
 * Créé un commentaire
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 */
export const createComment = async (req: CustomRequest, res: Response) => {

        const { articleId } = req.params;
        const {userId} = req.user;
        const { content } = req.body;
        await commentService.createComment({  articleId, content, author: userId });
        response(res, { statusCode: 201, message: 'Comment created' });
}