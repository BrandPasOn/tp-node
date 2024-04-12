// dotenv permet de charger les variables d'environnement depuis un fichier .env
import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import helmet from 'helmet'
import cookieParser from "cookie-parser";

import router from "./infrastructure/web/routes";

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

import env from "./config/env";
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";


/**
 * Création intance app express
 * @type {Express} 
 */
const app = express();

// mw pour pouvoir lire les cookies plus facilement
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


/**
 * // Port d'écoute
 * @type {number}
 */
const { PORT } = env;

// applique le middleware1 à toutes les requêtes entrantes avant qu'elles n'atteignent les routes
// spécifiques
app.use(requestLogger);


// [GET] http://localhost:8000/error
app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Erreur de test pour montrer les mw d\'erreurs');
    next(error); // pour passer à l'errorHandler
})

app.use(router);

// Middleware de gestion d'erreur => toujours tout à la fin des routes et autres mw
app.use(errorHandler);

// Faire écouter l'app sur le port spécifié puis afficher msg
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})