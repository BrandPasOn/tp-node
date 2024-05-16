
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { articles } from "../../infrastructure/data/schema/articles";

export type Article = InferSelectModel<typeof articles>;

export type NewArticle = InferInsertModel<typeof articles>;

export type ArticleColumns = { [K in keyof Article]?: boolean }