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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenMiddleware = void 0;
const AuthService_1 = require("../domain/services/AuthService");
const authService = new AuthService_1.AuthService();
const refreshTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // On récupére le refreshToken des cookies de l'utilisateur
    const { refreshToken } = req.cookies;
    // Si aucun refresh token n'est présent, on passe au mw suivant
    if (!refreshToken)
        return next();
    try {
        const newAccessToken = authService.refreshAccessToken(refreshToken);
        // Si le refresh est réussit: on renouvelle l'accesstoken dans nos cookies
        if (newAccessToken) {
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true, // protection attaque XSS
                secure: process.env.NODE_ENV === 'production' // disponible que en https en production
            });
        }
        // Passage au middleware suivant
        next();
    }
    catch (error) {
        console.error(error);
    }
});
exports.refreshTokenMiddleware = refreshTokenMiddleware;
