"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const jwtSecret = env_1.default.JWT_SECRET;
class AuthService {
    /**
     *
     * @param id de l'utilisateur
     * @returns le token jwt
     */
    jwtToken(id) {
        const token = jsonwebtoken_1.default.sign({ id }, jwtSecret, { expiresIn: "1h" });
        return token;
    }
}
exports.AuthService = AuthService;
