"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const ArticleRepository_1 = require("../../infrastructure/repositories/ArticleRepository");
const crypto_1 = __importDefault(require("crypto"));
// Service qui gère la logique métier des articles
class ArticleService {
    constructor() {
        this.articleRepository = new ArticleRepository_1.ArticleRepository();
    }
    /**
     * Crée un nouvel article
     * @param article L'article à créer
     */
    addArticle(article) {
        const articles = this.articleRepository.getAllArticles();
        // Ajoute le nouvel article à la liste des articles
        articles.push(Object.assign({ id: crypto_1.default.randomUUID() }, article));
        // Sauvegarde les articles
        this.articleRepository.save(article);
    }
    /**
     * Récupère un article par son titre
     * @param title Le titre de l'article à récupérer
     * @returns L'article trouvé ou undefined si aucun article n'est trouvé avec le titre spécifié
     */
    getArticleByTitle(title) {
        return this.articleRepository.getByTitle(title);
    }
    /**
     * Récupère tous les articles
     * @returns Tous les articles
     */
    getAllArticles() {
        return this.articleRepository.getAllArticles();
    }
}
exports.ArticleService = ArticleService;
