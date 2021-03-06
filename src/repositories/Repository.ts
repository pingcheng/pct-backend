import { PostsRepository } from "./posts/PostsRepository";
import { PostsMysqlRepository } from "./posts/PostsMysqlRepository";
import { PostTagsRepository } from "./posts/tags/PostTagsRepository";
import { PostTagsMysqlRepository } from "./posts/tags/PostTagsMysqlRepository";
import { PostCategoriesRepository } from "./posts/categories/PostCategoriesRepository";
import { PostCategoriesMysqlRepository } from "./posts/categories/PostCategoriesMysqlRepository";

/**
 * Repository factory.
 */
export class Repository {

    private static repos: Record<string, any> = {};

    /**
     * Get the posts repository.
     */
    public static getPostRepository(): PostsRepository {
        return this.getRepository("posts", () => {
            return new PostsMysqlRepository();
        });
    }

    /**
     * Get the post tags repository.
     */
    public static getPostTagsRepository(): PostTagsRepository {
        return this.getRepository("postTags", () => {
            return new PostTagsMysqlRepository();
        });
    }

    /**
     * Get the post categories repository.
     */
    public static getPostCategoriesRepository(): PostCategoriesRepository {
        return this.getRepository("postCategories", () => {
            return new PostCategoriesMysqlRepository();
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