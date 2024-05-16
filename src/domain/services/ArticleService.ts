import { Article, NewArticle } from "../entities/Article";
import { ArticleRepository } from "../../infrastructure/repositories/ArticleRepository";
import crypto from 'crypto'

// Service qui gère la logique métier des articles
export class ArticleService {
    private articleRepository: ArticleRepository;

    constructor() {
        this.articleRepository = new ArticleRepository();
    }

    /**
     * Crée un nouvel article
     * @param article L'article à créer
     */
    async addArticle(article: NewArticle) {
        if (article?.title?.trim().length < 1 || article?.content?.trim().length < 1)
            return;
        const newArticle = await this.articleRepository.createArticle(article);
    }

    /**
     * Récupère un article par son titre
     * @param title Le titre de l'article à récupérer
     * @returns L'article trouvé ou undefined si aucun article n'est trouvé avec le titre spécifié
     */
    getArticleByTitle(title: string) {
        return this.articleRepository.getByTitle(title);
    }

    /**
     * Récupère tous les articles
     * @returns Tous les articles
     */
    getAllArticles() {
        return this.articleRepository.getAllArticles();
    }

    /**
     * Supprime un article
     * @param id Id du l'article a supprimer
     * @param userId Id de l'auteur de l'article
     */
    deleteArticleById(id: string) {
        if (!id || id.trim().length < 3)
            return;
        return this.articleRepository.deleteArticle(id);
    }
}