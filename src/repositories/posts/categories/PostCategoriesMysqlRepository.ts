import { PostCategoriesRepository } from "./PostCategoriesRepository";
import { PostCategoryInterface } from "../../../models/posts/categories/PostCategoryInterface";
import DB from "../../../lib/database/DB";

export class PostCategoriesMysqlRepository implements PostCategoriesRepository {

    async getById(categoryId: number): Promise<PostCategoryInterface> {

        const rows = await DB.query(`
            SELECT id,
                   name
            FROM post_categories
            WHERE id = ?
            LIMIT 1
        `, [
            categoryId
        ]);

        if (rows.length === 0) {
            return null;
        }

        const category = rows[0];

        return {
            id: category.id,
            name: category.name
        };
    }

    async list(): Promise<Array<PostCategoryInterface>> {
        const rows = await DB.query(`
            SELECT id,
                name
            FROM post_categories   
        `);

        const categories: Array<PostCategoryInterface> = [];

        rows.forEach(row => {
            categories.push({
                id: row.id,
                name: row.name
            });
        });

        return categories;
    }

}