import { Request } from "express";
import { Repository } from "../../repositories/Repository";
import { PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";
import { PostInterface, PostSummaryInterface } from "../../models/posts/PostInterface";

export class PostController {
    public static async list(request: Request): Promise<PaginatedResponseObject<PostSummaryInterface>> {
        let page = parseInt(request.query.page as string);

        if (!page || page < 1) {
            page = 1;
        }

        return await Repository.getPostRepository().listPosts(5, page);
    }

    public static async getPostBySlug(request: Request, slug: string): Promise<PostInterface> {
        return Repository.getPostRepository().getPostBySlug(slug);
    }
}