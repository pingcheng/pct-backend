import { PostsRepository } from "./PostsRepository";
import { PostInterface, PostSummaryInterface } from "../../models/posts/PostInterface";
import DB from "../../lib/database/DB";
import { PaginatedResponse, PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";
import { PostStatus } from "../../models/posts/PostStatus";

export class PostsMysqlRepository implements PostsRepository {

    async listPosts(options): Promise<PaginatedResponseObject<PostSummaryInterface>> {

        const perPage = options.perPage || 5;
        const page = options.page || 1;
        const categoryId = options.categoryId;

        // get posts
        const rows = await DB.query(`
            SELECT id,
                   title,
                   slug,
                   SUBSTRING(content, 1, 500) AS content,
                   created_at
            FROM posts
            WHERE status = :status
            ${categoryId !== null ? "AND category = :categoryId" : ""} 
            ORDER BY id DESC
            LIMIT :limit OFFSET :offset
        `, {
            status: PostStatus.PUBLISHED,
            limit: perPage,
            offset: (page - 1) * perPage,
            categoryId: categoryId
        });
        const posts: PostSummaryInterface[] = [];

        const total = await DB.query(`
            SELECT COUNT(1) AS total
            FROM posts
            WHERE status = :status
            ${categoryId !== null ? "AND category = :categoryId" : ""}
        `, {
            status: PostStatus.PUBLISHED,
            categoryId: categoryId
        });

        for (let row of rows) {
            posts.push({
                id: row.id,
                title: row.title,
                content: row.content,
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
                   category as category_id,
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

        // If no posts found, return null
        if (posts.length === 0) {
            return null;
        }

        const post = posts[0];

        return {
            id: post.id,
            categoryId: post.category_id,
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