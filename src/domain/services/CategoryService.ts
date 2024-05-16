import { Article, NewArticle } from "../entities/Article";
import { ArticleRepository } from "../../infrastructure/repositories/ArticleRepository";
import crypto from 'crypto'
import { CategoryRepository } from "../../infrastructure/repositories/CategoryRepository";
import { NewCategory } from "../entities/Category";

// Service qui gère la logique métier des articles
export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    /**
     * Crée un nouvel catégorie
     * @param category La catégorie à créer
     */
    async addCategory(category: NewCategory) {
        if (category?.title?.trim().length < 1)
            return;
        const newCategory = await this.categoryRepository.createArticle(category);
    }

    /**category
     * Récupère une catégorie par son titre
     * @param title Le titre de la catégorie à récupérer
     * @returns La catégorie trouvé ou undefined si aucune catégorie n'est trouvé avec le titre spécifié
     */
    getCategoryByTitle(title: string) {
        return this.categoryRepository.getByTitle(title);
    }

    /**
     * Récupère tous les articles
     * @returns Tous les articles
     */
    getAllCategory() {
        return this.categoryRepository.getAllCategories();
    }

    /**
     * Supprime une catégorie
     * @param id Id du catégorie a supprimer
     * @param userId Id de l'auteur du catégorie
     */
    deleteCategoryById(id: string, userId: string) {
        if (!id || id.trim().length < 3)
            return;
        return this.categoryRepository.deleteCategory(id);
    }
}