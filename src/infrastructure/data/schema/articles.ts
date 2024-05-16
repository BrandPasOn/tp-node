import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { users, categories } from '.';

export const articles = pgTable('articles', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255}).notNull(),
    content: text('content').notNull(),
    author: uuid('author').references(() => users.id).notNull(), // foreign key
    category: uuid('categoryId').references(() => categories.id).notNull(), // foreign key
})