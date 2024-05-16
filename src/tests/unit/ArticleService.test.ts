// les imports de @jest/globals pour les fonctions de test et d'assertion 
import { describe, beforeAll, afterAll, afterEach, it, expect } from '@jest/globals';

// Nous auront besoins de notre service et de notre repository pour tester
import { ArticleService } from '../../domain/services/ArticleService';
import { ArticleRepository } from '../../infrastructure/repositories/ArticleRepository';
import { NewArticle } from '../../domain/entities/Article';

// Rappelez vous, nous avons créé un utilisateur pour nos tests dans le fichier jest.setup.ts
import { createdUser } from '../jest.setup';
import { createdCategory } from '../jest.setup';
import { db } from '../../infrastructure/data';
import { sql } from 'drizzle-orm';

describe('ArticleService', () => {
    
    let articleRepository: ArticleRepository;
    let createdArticleID: string | undefined;
        let newArticle: NewArticle = { title: 'New Article', content: 'Article content', author: createdUser.id, category: createdCategory.id }; 

    beforeAll(async () => {    
        articleRepository = new ArticleRepository();
        newArticle.author = createdUser.id;
        newArticle.category = createdCategory.id;
    });

    it('doit créer un article', async () => {
        await db.execute(sql`SET search_path TO test`);
        const article = await articleRepository.createArticle(newArticle);
        expect(article).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                content: expect.any(String),
                author: expect.objectContaining({
                    id: expect.any(String),
                    username: expect.any(String)
                }),
            category: expect.arrayContaining([
                expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String)
                })
            ])
            })
        )
    })

    it('doit récupéré tous les articles', async () => {
        await db.execute(sql`SET search_path TO test`);
        const articles = await articleRepository.getAllArticles();
        console.log(articles, "gngngn")
        expect(articles).toEqual( 
        expect.arrayContaining([ 
            expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                content: expect.any(String),
                author: expect.objectContaining({
                    id: expect.any(String),
                    username: expect.any(String)
                }),
            category: expect.arrayContaining([
                expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String)
                })
            ])
            })
        ])
        );
    });
})

