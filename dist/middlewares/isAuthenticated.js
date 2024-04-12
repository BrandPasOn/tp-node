"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../utils/response");
const env_1 = __importDefault(require("../config/env"));
// Clé secrète pour signer et vérifier les tokens JWT
const { JWT_SECRET } = env_1.default;
/**
 * Middleware pour vérifier l'authentification de l'utilisateur à l'aide d'un token JWT.
 * Si aucun token n'est présent dans les cookies de la requête, renvoie une erreur 403.
 * Si le token est présent mais invalide, renvoie une erreur 401.
 * Si le token est valide, ajoute les données décodées de l'utilisateur à l'objet req et passe au middleware suivant.
 * @param req L'objet Request d'Express
 * @param res L'objet Response d'Express
 * @param next La fonction NextFunction d'Express pour passer au middleware suivant
 * @returns Renvoie une réponse HTTP en cas d'erreur ou passe au middleware suivant en cas de succès.
 */
const isAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return (0, response_1.response)(res, { statusCode: 403, message: 'Token missing' });
    try {
        // on décode le jwt dans le cookie 'token' avec notre secret
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const { id, name } = decoded;
        // On ajoute le payload dans la propriété req pour pouvoir l'utiliser dans les routes
        req.user = { id, name };
        // On passe au controller ou au mw suivant: tout s'est bien passé
        next();
    }
    catch (err) {
        // Le jwt est invalide: on envoit une 401 l'user n'est pas autorisé à accéder à la ressource
        return (0, response_1.response)(res, { statusCode: 401, message: 'Unauthorized' });
    }
};
exports.isAuth = isAuth;
