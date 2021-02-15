import { Request, Response } from "express";
import { Repository } from "../../repositories/Repository";
import { ApiResponse } from "../../lib/ApiResponse";

export class PostController {
    public static async list(request: Request, response: Response): Promise<void> {
        let page = parseInt(request.query.page as string);

        if (!page || page < 1) {
            page = 1;
        }

        response.send(ApiResponse.with(await Repository.getPostRepository().listPosts(5, page)));
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

        // Get category.
        const category = await Repository.getPostCategoriesRepository().getById(post.categoryId);

        // Return the content.
        response.send(ApiResponse.with({
            id: post.id,
            slug: post.slug,
            title: post.title,
            content: post.content,
            status: post.status,
            category: {
                id: category.id,
                name: category.name
            },
            tags: tags,
            timeCreated: post.timeUpdated,
        }));
    }
}