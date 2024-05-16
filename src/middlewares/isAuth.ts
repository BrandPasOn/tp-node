import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { response } from '../utils/response';
import env from "../config/env";


// Clé secrète pour signer et vérifier les tokens JWT
const { JWT_SECRET } = env;


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
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token)
        return response(res, { statusCode: 403, message: 'Token missing'});
    try {
        // on décode le jwt dans le cookie 'token' avec notre secret
        const decoded = jwt.verify(token, JWT_SECRET);
        const { userId, name } = decoded as jwt.JwtPayload;

        // On ajoute le payload dans la propriété req pour pouvoir l'utiliser dans les routes
        req.user = { userId, name };

        // On passe au controller ou au mw suivant: tout s'est bien passé
        next();
    } catch(err) {
        // Le jwt est invalide: on envoit une 401 l'user n'est pas autorisé à accéder à la ressource
        return response(res, { statusCode: 401, message: 'Unauthorized' });
    }
};
