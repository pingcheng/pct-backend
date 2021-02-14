import { Request } from "express";
import { Repository } from "../../repositories/Repository";

export class PostController {
    public static async handle(request: Request): Promise<Record<any, any>> {
        let page = parseInt(request.query.page as string);

        if (!page || page < 1) {
            page = 1;
        }

        return Repository.getPostRepository().listPosts(5, page);
    }
}