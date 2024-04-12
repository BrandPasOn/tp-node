import fs from 'fs';
import path from "path";
import { User } from "../../domain/entities/User";

// Repository qui gère le CRUD des utilisateurs
export class UserRepository {
    private users: User[] = [];

    // Le chemin du fichier JSON des utilisateurs (à partir du répertoire courant)
    private filePath = path.join(__dirname, '..', 'data', 'users.json');

    constructor() {
        // Charge les données des utilisateurs à partir du fichier JSON dès le constructeur
        this.loadUsers();
    }

    /**
     * Charge tous les utilisateurs
     */
    private loadUsers(): void {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            this.users = JSON.parse(data);
    }

    /**
     * Sauvegarde un nouvel utilisateur
     * @param user L'utilisateur à sauvegarder
     */
    save(user: User): void {
        // On récupère tous les users
        const users = this.getAllUsers();

        // On mets à jour le tableau récupéré, avec le nouvel utilisateur
        users.push({
            ...user,
            id: crypto.randomUUID()
        })
            
            // Convertit la liste d'utilisateurs en JSON
            const jsonData = JSON.stringify(this.users, null, 2);
            
            // Écrit le JSON dans le fichier
            fs.writeFileSync(this.filePath, jsonData, 'utf-8');
    }

    /**
     * Récupère un utilisateur par son nom d'utilisateur
     * @param username Le nom d'utilisateur de l'utilisateur à récupérer
     * @returns L'utilisateur trouvé ou undefined si aucun utilisateur n'est trouvé avec le nom d'utilisateur spécifié
     */
    getByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    /**
     * Récupère tous les utilisateurs
     * @returns Tous les utilisateurs
     */
    getAllUsers(): User[] {
        return this.users;
    }
}
