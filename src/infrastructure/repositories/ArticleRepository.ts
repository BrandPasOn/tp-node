import { NewArticle, Article, ArticleColumns } from "../../domain/entities/Article";
import { eq } from "drizzle-orm";
import { db } from "../data";
import { articles } from "../data/schema/articles";
import { users } from "../data/schema";
import { categories } from "../data/schema";

// Repository qui gère le CRUD des posts
export class ArticleRepository {
    private articles: Article[] = [];

    /**
     * Création
     * @param article L'article à sauvegarder
     */
    createArticle(article: NewArticle) {
        try {
            return db.insert(articles).values(article).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de créer l'article")
        }
    }

    /**
     * Récupère un article par son titre
     * @param title Le titre de l'article à récupérer
     * @returns L'article trouvé ou undefined si aucun article n'est trouvé avec le titre spécifié
     */
    getByTitle(title: string) {
        try {
            return db.select({
                id: articles.id,
                title: articles.title,
                content: articles.content,
                author: {
                    id: users.id,
                    username: users.username
                },
            }).from(articles)
            .leftJoin(
                users, eq(articles.author, users.id)
            ).where(
                eq(articles.title, title)
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    }

    /**
     * Récupère tous les articles
     * @returns Tous les articles
     */
    getAllArticles() {
        return db.select({
            id: articles.id,
            title: articles.title,
            content: articles.content,
            author: {
                id: users.id,
                username: users.username
            },
            category: {
                id: categories.id,
                title: categories.title
            },

        })
        .from(articles)
        .leftJoin(users, eq(articles.author, users.id))
        .leftJoin(categories, eq(articles.category, categories.id))
        .execute();
    }

    /**
     * Supprime un article selon son ID
     */
    deleteArticle(id: string) {
        try {
            return db.delete(articles).where(eq(articles.id, id)).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer l\'article');
        }
    }
}