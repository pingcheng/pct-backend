import { Request } from "express";
import { Repository } from "../../repositories/Repository";
import { PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";
import { PostSummaryInterface } from "../../models/posts/PostInterface";

export class PostController {
    public static async handle(request: Request): Promise<PaginatedResponseObject<PostSummaryInterface>> {
        let page = parseInt(request.query.page as string);

        if (!page || page < 1) {
            page = 1;
        }

        return await Repository.getPostRepository().listPosts(5, page);
    }
}