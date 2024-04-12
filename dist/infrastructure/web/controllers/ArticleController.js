"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticle = exports.getArticleByTitle = exports.getAllArticles = void 0;
const ArticleService_1 = require("../../../domain/services/ArticleService");
const response_1 = require("../../../utils/response");
const articleService = new ArticleService_1.ArticleService();
/**
 * Récupère tous les articles.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
const getAllArticles = (req, res) => {
    const articles = articleService.getAllArticles();
    console.table(articles);
    (0, response_1.response)(res, {
        statusCode: 200,
        message: 'OK',
        data: articles
    });
};
exports.getAllArticles = getAllArticles;
/**
 * Récupère un article par son titre.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
const getArticleByTitle = (req, res) => {
    const title = req.params.title;
    const article = articleService.getArticleByTitle(title);
    console.table(article);
    if (!article) {
        (0, response_1.response)(res, { statusCode: 404, message: 'Article not found' });
    }
    else {
        (0, response_1.response)(res, { statusCode: 200, message: 'OK', data: article });
    }
};
exports.getArticleByTitle = getArticleByTitle;
/**
 * Crée un nouvel article et l'associe à l'utilisateur qui l'a créé.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 */
const createArticle = (req, res) => {
    var _a;
    // Récupérer les données de l'article à partir du corps de la requête
    const { title, content } = req.body;
    // Récupérer l'ID de l'utilisateur à partir de l'objet req (peut être ajouté par le middleware d'authentification)
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return (0, response_1.response)(res, { statusCode: 401, message: 'Unauthorized' });
    }
    // Créer un objet Article à partir des données récupérées
    const article = { title, content, userId };
    // Ajouter l'article en utilisant le service d'articles
    articleService.addArticle(article);
    // Renvoyer une réponse indiquant que l'article a été créé avec succès
    (0, response_1.response)(res, { statusCode: 201, message: 'Article created successfully' });
};
exports.createArticle = createArticle;
