import { NewCategory, Category, CategoryColumns } from "../../domain/entities/Category";
import { eq } from "drizzle-orm";
import { db } from "../data";
import { categories, articles } from "../data/schema";

// Repository qui gère le CRUD des posts
export class CategoryRepository {
    private categories: Category[] = [];

    /**
     * Création
     * @param category La categorie à sauvegarder
     */
    createArticle(category: NewCategory) {
        try {
            return db.insert(categories).values(category).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de créer la catégorie")
        }
    }

    /**
     * Récupère un article par son titre
     * @param title Le titre de la categorie à récupérer
     * @returns La categorie trouvé ou undefined si aucun article n'est trouvé avec le titre spécifié
     */
    getByTitle(title: string) {
        try {
            return db.select({
                id: categories.id,
                title: categories.title,
            }).from(categories)
            .leftJoin(
                articles, eq(categories.id, articles.category)
            ).where(
                eq(categories.title, title)
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer la catégorie")
        }
    }

    /**
     * Récupère tous les categories
     * @returns Tous les categories
     */
    getAllCategories() {
        return db.select({
                id: categories.id,
                title: categories.title,
            }).from(categories)
            .execute();
    }

    /**
     * Supprime une categorie selon son ID
     */
    deleteCategory(id: string) {
        try {
            return db.delete(categories).where(eq(categories.id, id)).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer la catégorie');
        }
    }
}