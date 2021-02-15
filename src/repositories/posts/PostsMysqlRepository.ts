import { PostsRepository } from "./PostsRepository";
import { PostSummaryInterface } from "../../models/posts/PostInterface";
import DB from "../../lib/database/DB";
import { PaginatedResponse, PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";

export class PostsMysqlRepository implements PostsRepository {

    async listPosts(perPage: number = 5, page: number = 1): Promise<PaginatedResponseObject<PostSummaryInterface>> {

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

        return PaginatedResponse.with({
            items: posts,
            totalItems: total[0].total,
            perPage: perPage,
            currentPage: page
        });
    }

}