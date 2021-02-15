import { Request, Response } from "express";
import { Repository } from "../../repositories/Repository";
import { ApiResponse } from "../../lib/ApiResponse";

export class PostController {
    public static async list(request: Request, response: Response): Promise<void> {

        // Get the page
        const page = Math.max(parseInt(request.query.page as string), 1);
        const tag = request.query.hasOwnProperty("tag") ? String(request.query.tag).trim() : null;
        const categoryId = request.query.hasOwnProperty("categoryId") ? Number(request.query.categoryId) : null;

        // Check the category ID.
        if (categoryId !== null && (!Number.isInteger(categoryId) || categoryId < 1)) {
            response.status(400).send(ApiResponse.with(null, "Category ID must an positive integer"));
            return;
        }

        // Check the tag.
        if (tag === "") {
            response.status(400).send(ApiResponse.with(null, "Tag cannot be empty"));
            return;
        }

        response.send(ApiResponse.with(await Repository.getPostRepository().listPosts({
            page,
            tag,
            categoryId
        })));
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
            timeCreated: post.timeCreated,
        }));
    }
}