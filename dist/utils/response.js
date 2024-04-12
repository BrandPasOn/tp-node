"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
// fonction qui permet de normaliser les réponses de l'API (pour avoir une structure commune, et typesafe)
const response = (res, normalized) => {
    res.setHeader("X-Powered-By", "Brandonito");
    return res.status(normalized.statusCode).json({
        message: normalized.message,
        data: normalized.data
    });
};
exports.response = response;
