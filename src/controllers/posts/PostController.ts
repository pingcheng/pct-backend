import { Request } from "express";
import { Repository } from "../../repositories/Repository";

export class PostController {
    public static async handle(request: Request): Promise<Record<any, any>> {
        return Repository.getPostRepository().listPosts();
    }
}