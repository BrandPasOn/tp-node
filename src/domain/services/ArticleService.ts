import { Article } from "../entities/Article";
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
    addArticle(article: Article): void {
        const articles = this.articleRepository.getAllArticles();

        // Ajoute le nouvel article à la liste des articles
        articles.push({
            id: crypto.randomUUID(),
            ...article,
        });

        // Sauvegarde les articles
        this.articleRepository.save(article);
    }

    /**
     * Récupère un article par son titre
     * @param title Le titre de l'article à récupérer
     * @returns L'article trouvé ou undefined si aucun article n'est trouvé avec le titre spécifié
     */
    getArticleByTitle(title: string): Article | undefined {
        return this.articleRepository.getByTitle(title);
    }

    /**
     * Récupère tous les articles
     * @returns Tous les articles
     */
    getAllArticles(): Article[] {
        return this.articleRepository.getAllArticles();
    }
}