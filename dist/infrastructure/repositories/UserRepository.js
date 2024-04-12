"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Repository qui gère le CRUD des utilisateurs
class UserRepository {
    constructor() {
        this.users = [];
        // Le chemin du fichier JSON des utilisateurs (à partir du répertoire courant)
        this.filePath = path_1.default.join(__dirname, '..', 'data', 'users.json');
        // Charge les données des utilisateurs à partir du fichier JSON dès le constructeur
        this.loadUsers();
    }
    /**
     * Charge tous les utilisateurs
     */
    loadUsers() {
        const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
        this.users = JSON.parse(data);
    }
    /**
     * Sauvegarde un nouvel utilisateur
     * @param user L'utilisateur à sauvegarder
     */
    save(user) {
        // On récupère tous les users
        const users = this.getAllUsers();
        // On mets à jour le tableau récupéré, avec le nouvel utilisateur
        users.push(Object.assign(Object.assign({}, user), { id: crypto.randomUUID() }));
        // Convertit la liste d'utilisateurs en JSON
        const jsonData = JSON.stringify(this.users, null, 2);
        // Écrit le JSON dans le fichier
        fs_1.default.writeFileSync(this.filePath, jsonData, 'utf-8');
    }
    /**
     * Récupère un utilisateur par son nom d'utilisateur
     * @param username Le nom d'utilisateur de l'utilisateur à récupérer
     * @returns L'utilisateur trouvé ou undefined si aucun utilisateur n'est trouvé avec le nom d'utilisateur spécifié
     */
    getByUsername(username) {
        return this.users.find(user => user.username === username);
    }
    /**
     * Récupère tous les utilisateurs
     * @returns Tous les utilisateurs
     */
    getAllUsers() {
        return this.users;
    }
}
exports.UserRepository = UserRepository;
