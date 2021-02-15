import { Request, Response } from "express";
import { ApiResponse } from "../../lib/ApiResponse";
import { Repository } from "../../repositories/Repository";

export class PostCategoryController {

    public static async list(req: Request, res: Response): Promise<void> {
        res.send(ApiResponse.with((await Repository.getPostCategoriesRepository().list()).map(category => {
            return {
                id: category.id,
                name: category.name
            }
        })));
    }
}