import { db } from "../data";
import path from "path";
import { NewUser, User, UserColumns } from "../../domain/entities/User";
import { eq } from "drizzle-orm";
import { users } from "../data/schema/users";

// Repository qui gère le CRUD des utilisateurs
export class UserRepository {
    private users: User[] = [];

    /**
     * Création
     * @param user L'utilisateur à sauvegarder
     */
    createUser(user: NewUser) {
        try {
            return db.insert(users).values(user).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de créer l'utilisateur")
        }
    }

    /**
     * Récupère un utilisateur en fonction de son id
     */
    getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns
            })
            // SELECT id, username FROM users WHERE id = $1
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    }

    getUserByUsername(username: string, columns: UserColumns): Promise< Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: eq(users.username, username),
                columns
            })
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    }

    /**
     * Récupère tous les utilisateurs
     * @returns Tous les utilisateurs
     */
    getAllUsers(): Promise< Partial<User>[] > {
        try {
            return db.query.users.findMany({
                columns: {
                    id: true,
                    username: true
                }
            });
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer les utilisateurs")
        }
    }

    /**
     * Met à jour un utilisateur
     */
    updateUser(user: User) {
        try {
            return db.update(users)
                .set(user)
                .where(
                    eq(users.id, user.id)
                ).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de mettre à jour l'utilisateur")
        }
    }
}
