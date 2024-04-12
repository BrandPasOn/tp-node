import { Article } from "../../domain/entities/Article";
import fs from 'fs';
import path from "path";

// Repository qui gère le CRUD des posts
export class ArticleRepository {
    private articles: Article[] = [];

    // Le chemin du fichier JSON des pots (à partir du repertoire courant)
    private filePath = path.join(__dirname, '..', 'data', 'articles.json');

    constructor() {
        // on charge les données des pots à partir du fichier JSON dès le constructeur pour
        // qu'il soient disponibles dans la class
        this.articles = this.loadArticles();
    }

    /**
     * Charges tous les articles
     * @returns json avec tous les articles
     */
    private loadArticles(): Article[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data);
    }

    /**
     * Sauvegarde un nouvel article
     * @param article L'article à sauvegarder
     */
    save(article: Article): void {
        // Ajoute le nouvel article à la liste des articles existants
        this.articles.push(article);
        
        // Convertit la liste d'articles en JSON
        const jsonData = JSON.stringify(this.articles, null, 2);
        
        // Écrit le JSON dans le fichier
        fs.writeFileSync(this.filePath, jsonData, 'utf-8');
    }

    /**
     * Récupère un article par son titre
     * @param title Le titre de l'article à récupérer
     * @returns L'article trouvé ou undefined si aucun article n'est trouvé avec le titre spécifié
     */
    getByTitle(title: string): Article | undefined {
        return this.articles.find(article => article.title === title);
    }

    /**
     * Récupère tous les articles
     * @returns Tous les articles
     */
    getAllArticles(): Article[] {
        return this.articles;
    }
}