import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { articles } from "./articles";

export const categories = pgTable('categories', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255}).notNull(),
})