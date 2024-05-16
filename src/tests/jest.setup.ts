// src/tests/jest.setup.ts
import { beforeAll, afterAll } from '@jest/globals';
import { db, pool } from '../infrastructure/data';
import bcrypt from 'bcrypt';

import { sql } from 'drizzle-orm';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { users } from '../infrastructure/data/schema';

export let createdUser: {id: string, username: string, password: string} = { id: '', username: '', password: '' }
export let createdCategory: {id: string, title: string} = { id: '', title: '' }
export let createdArticle: { id: string, title: string, content: string, authorId: string, categoryId: string } = { id: '', title: 'Default Title', content: '', authorId: '', categoryId: '' };


beforeAll(async () => {
    try {
        console.log('Setting up test environment...');
        // On va créer notre schéma de test dans notre DB, imaginez un schéma pgsql comme une base de donnée dans une base de donnée, c'est un espace de nommage
        // pour éviter de devoir créer une base de données annexe pour nos tests
        await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);

        // On dit à notre DB de travailler dans le schéma test
        await db.execute(sql`SET search_path TO test`);
    
        // On va appliquer nos migrations dans le schéma test, c'est à dire insérer nos tables à l'intérieur
        await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle', migrationsSchema: 'test' });
        console.log('Migrations applied.');
    
        // On va créer notre utilisateur de test, qui s'occupera d'écrire des articles, commenter, etc...
        const hashedPassword = await bcrypt.hash('mdp', 10);
        const result = await db.insert(users)
          .values({ username: 'brandon', password: hashedPassword })
          .returning()
          .execute();
    
        // createdUser, qui est exporté dans ce fichier. Nous le mettons à jour avec l'utilisateur que nous venons de créer
        createdUser = { id: result[0].id, username: 'brandon', password: hashedPassword };
        createdCategory = { id: result[0].id, title: 'BG' };
        createdArticle = { id: result[0].id, title: 'Article Title', content: 'Article Content', authorId: createdUser.id, categoryId: createdCategory.id };
        console.log('Test user created:', createdUser);
        console.log('Test category created:', createdCategory);
        console.log('Test article created:', createdArticle);
    } catch (error) {
        console.error('Error during beforeAll:', error);
    }
});

afterAll(async () => {
    try {
        // await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
        await pool.end();
    } catch (error) {
        console.error('Error during afterAll:', error);
    }
});