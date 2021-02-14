import { PostsRepository } from "./PostsRepository";
import { PostSummaryInterface } from "../../models/posts/PostInterface";
import DB from "../../lib/database/DB";

export class PostsMysqlRepository implements PostsRepository {

    async listPosts(perPage: number = 5, page: number = 1): Promise<{
        items: Array<PostSummaryInterface>
        total: number
        perPage: number
        currentPage: number
        totalPages: number
    }> {

        // get posts
        const rows = await DB.query("SELECT * FROM posts LIMIT ? OFFSET ?", [
            perPage,
            (page - 1) * perPage
        ]);
        const posts: PostSummaryInterface[] = [];

        const total = await DB.query("SELECT COUNT(1) AS total from posts");

        for (let row of rows) {
            posts.push({
                id: row.id,
                title: row.title,
                slug: row.slug,
                timeCreated: row.created_at
            });
        }

        return {
            items: posts,
            total: total[0].total,
            perPage: perPage,
            currentPage: page,
            totalPages: Math.ceil(total[0].total / perPage)
        };
    }

}