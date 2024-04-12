import { getAllArticles } from './ArticleController';
import { ArticleService } from '../../../domain/services/ArticleService';

// Crée un mock ou un stub pour simuler le comportement du service d'articles
const mockArticleService = {
    getAllArticles: jest.fn(),
};

// Crée une instance du contrôleur d'articles pour les tests
const controller = getAllArticles;

// Teste le scénario où la récupération de tous les articles réussit
test('getAllArticles renvoie tous les articles avec succès', () => {
    // Crée une liste d'articles factice
    const articles = [{ id: '1', title: 'Article 1', content: 'Contenu de l\'article 1', userId: '12' }, { id: '2', title: 'Article 2', content: 'Contenu de l\'article 2', userId: '12' }];

    // Mock la fonction getAllArticles du service pour qu'elle retourne la liste d'articles factice
    mockArticleService.getAllArticles.mockReturnValue(articles);

    // Crée une requête et une réponse Express factices pour les tests
    const req = {} as any;

    const res = {
        statusCode: 0,
        data: {},
        status: function(code: number) {
            this.statusCode = code;
            return this;
        },
        json: function(data: any) {
            this.data = data;
            return this;
        }
    } as any;

    // Appelle la fonction du contrôleur d'articles avec les requête et réponse factices
    controller(req, res);

    // Vérifie si la fonction getAllArticles du service a été appelée
    expect(mockArticleService.getAllArticles).toHaveBeenCalled();

    // Vérifie si la réponse contient le code de statut et le message attendus
    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({
        statusCode: 200,
        message: 'OK',
        data: articles,
    });
});
