import { PostsRepository } from "./PostsRepository";
import { PostSummaryInterface } from "../../models/posts/PostInterface";
import DB from "../../lib/database/DB";

export class PostsMysqlRepository implements PostsRepository {
    async listPosts(): Promise<Array<PostSummaryInterface>> {
        const rows = await DB.query("SELECT * FROM posts LIMIT 5");
        const posts: PostSummaryInterface[] = [];

        for (let row of rows) {
            posts.push({
                id: row.id,
                title: row.title,
                slug: row.slug,
                timeCreated: 1
            });
        }

        return posts;
    }

}