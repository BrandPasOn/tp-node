"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Repository qui gère le CRUD des posts
class ArticleRepository {
    constructor() {
        this.articles = [];
        // Le chemin du fichier JSON des pots (à partir du repertoire courant)
        this.filePath = path_1.default.join(__dirname, '..', 'data', 'articles.json');
        // on charge les données des pots à partir du fichier JSON dès le constructeur pour
        // qu'il soient disponibles dans la class
        this.articles = this.loadArticles();
    }
    /**
     * Charges tous les articles
     * @returns json avec tous les articles
     */
    loadArticles() {
        const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    /**
     * Sauvegarde un nouvel article
     * @param article L'article à sauvegarder
     */
    save(article) {
        // Ajoute le nouvel article à la liste des articles existants
        this.articles.push(article);
        // Convertit la liste d'articles en JSON
        const jsonData = JSON.stringify(this.articles, null, 2);
        // Écrit le JSON dans le fichier
        fs_1.default.writeFileSync(this.filePath, jsonData, 'utf-8');
    }
    /**
     * Récupère un article par son titre
     * @param title Le titre de l'article à récupérer
     * @returns L'article trouvé ou undefined si aucun article n'est trouvé avec le titre spécifié
     */
    getByTitle(title) {
        return this.articles.find(article => article.title === title);
    }
    /**
     * Récupère tous les articles
     * @returns Tous les articles
     */
    getAllArticles() {
        return this.articles;
    }
}
exports.ArticleRepository = ArticleRepository;
