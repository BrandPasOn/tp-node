"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
// middleware de gestion d'erreur, qui permet de gérer les erreurs de manière centralisée
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // affiche l'erreur dans le terminal
    return (0, response_1.response)(res, { statusCode: 500, message: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
