import { PostsRepository } from "./PostsRepository";
import { PostInterface, PostSummaryInterface } from "../../models/posts/PostInterface";
import DB from "../../lib/database/DB";
import { PaginatedResponse, PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";
import { PostStatus } from "../../models/posts/PostStatus";

export class PostsMysqlRepository implements PostsRepository {

    async listPosts(perPage: number = 5, page: number = 1): Promise<PaginatedResponseObject<PostSummaryInterface>> {

        // get posts
        const rows = await DB.query(`
            SELECT id,
                   title,
                   slug,
                   created_at
            FROM posts
            LIMIT ? OFFSET ?
        `, [
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

    async getPostBySlug(slug: string): Promise<PostInterface> {
        // get post data
        const posts = await DB.query(`
            SELECT id,
                   title,
                   content,
                   status,
                   slug,
                   created_at,
                   updated_at
            FROM posts
            WHERE slug = ?
            AND status = ?
        `, [
            slug,
            PostStatus.PUBLISHED
        ]);

        if (posts.length === 0) {
            return null;
        }

        const post = posts[0];

        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            content: post.content,
            status: post.status,
            allowComments: false,
            timeCreated: post.created_at,
            timeUpdated: post.updated_at
        }
    }

}