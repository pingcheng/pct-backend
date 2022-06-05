import { PostRepository } from "src/repositories/posts/PostRepository";
import { PostMysqlRepository } from "src/repositories/posts/PostMysqlRepository";
import { PostTagRepository } from "src/repositories/posts/tags/PostTagRepository";
import { PostTagMysqlRepository } from "src/repositories/posts/tags/PostTagMysqlRepository";
import { PostCategoryRepository } from "src/repositories/posts/categories/PostCategoryRepository";
import { PostCategoryMysqlRepository } from "src/repositories/posts/categories/PostCategoryMysqlRepository";

/**
 * Repository factory.
 */
export class Repository {

    private static repos: Record<string, any> = {};

    /**
     * Get the post repository.
     */
    public static getPostRepository(): PostRepository {
        return this.getRepository("posts", () => {
            return new PostMysqlRepository();
        });
    }

    /**
     * Get the post tags repository.
     */
    public static getPostTagsRepository(): PostTagRepository {
        return this.getRepository("postTags", () => {
            return new PostTagMysqlRepository();
        });
    }

    /**
     * Get the post categories repository.
     */
    public static getPostCategoriesRepository(): PostCategoryRepository {
        return this.getRepository("postCategories", () => {
            return new PostCategoryMysqlRepository();
        })
    }

    /**
     * Return a repository.
     * If the name is not found in the static repository collection, then use the runner to generate a new repository
     * store it and then return it.
     *
     * @param name
     * @param runner
     * @private
     */
    private static getRepository(name: string, runner: Function) {
        if (!this.repos.hasOwnProperty(name)) {
            this.repos[name] = runner();
        }

        return this.repos[name];
    }
}