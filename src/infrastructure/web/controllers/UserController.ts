import { Request, Response } from 'express';
import env from '../../../config/env';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/UserRepository';
import { AuthService } from '../../../domain/services/AuthService';
import { response } from '../../../utils/response';

const userRepo = new UserRepository();
const authServ = new AuthService();

/**
 * Authentifie un utilisateur avec les informations fournies.
 * @param req L'objet Request d'Express contenant les informations de la requête
 * @param res L'objet Response d'Express pour envoyer la réponse
 */
export const login = async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;

        // Récupérer l'utilisateur par son nom d'utilisateur
        const user = userRepo.getByUsername(username);

        if (!user) {
            // Si aucun utilisateur trouvé, renvoyer une erreur d'authentification
            return response(res, { statusCode: 401, message: 'Invalid credentials' });
        }

        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Si le mot de passe ne correspond pas, renvoyer une erreur d'authentification
            return response(res, { statusCode: 401, message: 'Invalid credentials' });
        }

        // Générer le token JWT
        const token = authServ.jwtToken(user.id as string);

        // Définir le cookie contenant le token JWT
        res.cookie('token',token,{"httpOnly": true, "secure": env.NODE_ENV != "development" })

        response(res, { statusCode: 200, message: 'Login successful', data: { token } });
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error' });
    }
}

/**
 * Enregistre un nouvel utilisateur avec les informations fournies.
 * @param req L'objet Request d'Express contenant les informations de la requête
 * @param res L'objet Response d'Express pour envoyer la réponse
 */
export const register = async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        if (userRepo.getByUsername(username)) {
            return response(res, { statusCode: 400, message: 'User already exists' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = {
            username,
            password: hashedPassword
        };

        // Ajouter l'utilisateur à la base de données
        userRepo.save(newUser);

        // Réponse réussie avec le token JWT
        response(res, { statusCode: 201, message: 'User registered successfully' });
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error' });
    }
};