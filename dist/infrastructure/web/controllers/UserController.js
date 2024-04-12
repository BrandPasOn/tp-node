"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const env_1 = __importDefault(require("../../../config/env"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../../repositories/UserRepository");
const AuthService_1 = require("../../../domain/services/AuthService");
const response_1 = require("../../../utils/response");
const userRepo = new UserRepository_1.UserRepository();
const authServ = new AuthService_1.AuthService();
/**
 * Authentifie un utilisateur avec les informations fournies.
 * @param req L'objet Request d'Express contenant les informations de la requête
 * @param res L'objet Response d'Express pour envoyer la réponse
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Récupérer l'utilisateur par son nom d'utilisateur
        const user = userRepo.getByUsername(username);
        if (!user) {
            // Si aucun utilisateur trouvé, renvoyer une erreur d'authentification
            return (0, response_1.response)(res, { statusCode: 401, message: 'Invalid credentials' });
        }
        // Vérifier le mot de passe
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            // Si le mot de passe ne correspond pas, renvoyer une erreur d'authentification
            return (0, response_1.response)(res, { statusCode: 401, message: 'Invalid credentials' });
        }
        // Générer le token JWT
        const token = authServ.jwtToken(user.id);
        // Définir le cookie contenant le token JWT
        res.cookie('token', token, { "httpOnly": true, "secure": env_1.default.NODE_ENV != "development" });
        (0, response_1.response)(res, { statusCode: 200, message: 'Login successful', data: { token } });
    }
    catch (error) {
        console.error(error);
        (0, response_1.response)(res, { statusCode: 500, message: 'Internal server error' });
    }
});
exports.login = login;
/**
 * Enregistre un nouvel utilisateur avec les informations fournies.
 * @param req L'objet Request d'Express contenant les informations de la requête
 * @param res L'objet Response d'Express pour envoyer la réponse
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Vérifier si l'utilisateur existe déjà
        if (userRepo.getByUsername(username)) {
            return (0, response_1.response)(res, { statusCode: 400, message: 'User already exists' });
        }
        // Hasher le mot de passe
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Créer un nouvel utilisateur
        const newUser = {
            username,
            password: hashedPassword
        };
        // Ajouter l'utilisateur à la base de données
        userRepo.save(newUser);
        // Réponse réussie avec le token JWT
        (0, response_1.response)(res, { statusCode: 201, message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        (0, response_1.response)(res, { statusCode: 500, message: 'Internal server error' });
    }
});
exports.register = register;
