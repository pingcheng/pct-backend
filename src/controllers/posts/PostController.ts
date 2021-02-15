import { Request, Response } from "express";
import { Repository } from "../../repositories/Repository";
import { PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";
import { PostSummaryInterface } from "../../models/posts/PostInterface";
import { ApiResponse } from "../../lib/ApiResponse";

export class PostController {
    public static async list(request: Request): Promise<PaginatedResponseObject<PostSummaryInterface>> {
        let page = parseInt(request.query.page as string);

        if (!page || page < 1) {
            page = 1;
        }

        return await Repository.getPostRepository().listPosts(5, page);
    }

    public static async getPostBySlug(request: Request, response: Response): Promise<void> {
        const slug = request.params.slug;
        const post = await Repository.getPostRepository().getPostBySlug(slug);

        if (post === null) {
            response.status(400).send(ApiResponse.with(null, `Post with slug ${slug} cannot be found`));
            return;
        }

        // Only get tags' name.
        const tags = (await Repository.getPostTagsRepository().getTagsByPostId(post.id)).map(tag => tag.tag);

        // Combine the post and tags.
        response.send(ApiResponse.with({
            ...post,
            tags: tags
        }));
    }
}