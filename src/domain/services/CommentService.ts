import { CommentRepository } from "../../infrastructure/repositories/CommentRepository";
import { NewComment } from "../entities/Comment";

export class CommentService {
    private commentRepository: CommentRepository;

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    /**
     * Récupère tout les commentaire d'un article
     * @param id Id de l'article
     * @return Tous les commentaire d'un article
     */
    getCommentByArticleId(id: string) {
        if (!id || id.trim().length < 3)
            return;
        return this.commentRepository.getCommentsByArticleId(id);
    }

    /**
     * Supprime un commentaire
     * @param id Id du commentaire a supprimer
     * @param userId Id de l'auteur du commentaire
     */
    deleteCommentById(id: string, userId: string) {
        if (!id || id.trim().length < 3)
            return;
        return this.commentRepository.deleteCommentById(id, userId);
    }

    /**
     * Crée un nouveau commentaire
     * @param comment Données du commentaire
     */
    createComment(comment: NewComment) {
        if (!comment || comment.content.trim().length < 3)
            return;
        return this.commentRepository.createComment(comment);
    }

    /**
     * Récupère tous les commentaires
     * @return tous les commentaires
     */
    getAllComments() {
        return this.commentRepository.getAllComments();
    }
}