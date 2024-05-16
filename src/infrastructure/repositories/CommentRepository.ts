import { db } from "../data";
import { and, eq } from "drizzle-orm";
import { comments } from "../data/schema/comments";
import { articles } from "../data/schema/articles";
import { users } from "../data/schema/users";
import { NewComment } from "../../domain/entities/Comment";

/**
 * Repository qui gère le CRUD des commentaires
 */
export class CommentRepository {

    getCommentsByArticleId(articleId: string) {
        try {
            return db.select({
                id: comments.id,
                content: comments.content,
                author: {
                    id: users.id,
                    username: users.username
                }
            }).from(comments)
            .leftJoin(
                users, eq(users.id, comments.author)
            ).where(
                eq(articles.id, articleId)
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer le commentaire');
        }
    }


    /**
     * Supprimer un commentaire
     * @param id Id du commentaire a supprimer
     * @param userId Id de l'auteur du commentaire
     */
    deleteCommentById(id: string, userId: string) {
        try {
            return db.delete(comments).where(
                and(
                    eq(comments.id, id),
                    eq(comments.author, userId)
                )
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de supprimer le commentaire');
        }
    }


    /**
     * Créé un commentaire
     */
    createComment(comment: NewComment) {
        try {
            return db.insert(comments).values(comment).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de créer le commentaire');
        }
    }


    /**
     * Récupère tous les commentaires du fichier comments.json
     */
    getAllComments() {
        try {
            return db.select({
                id: comments.id,
                content: comments.content,
                post: {
                    id: articles.id,
                    title: articles.title
                },
                author: {
                    id: users.id,
                    username: users.username
                }
            }).from(comments)
            .leftJoin(
                users, eq(users.id, comments.author)
            ).leftJoin(
                articles, eq(articles.id, comments.articleId)
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer les commentaires');
        }
    }

}