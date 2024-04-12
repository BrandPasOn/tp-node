"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
// middleware qui log les requêtes entrantes (chemin + méthode utilisée)
const requestLogger = (req, res, next) => {
    console.log(`[${req.method}] - ${req.path}`);
    next();
};
exports.requestLogger = requestLogger;
