import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { users, articles } from '.';

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(), // pk
    articleId: uuid('articleId').references(() => articles.id).notNull(), // foreign key
    author: uuid('author').references(() => users.id).notNull(), // foreign key
    content: text('content').notNull(),
})