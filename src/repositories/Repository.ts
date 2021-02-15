import { PostsRepository } from "./posts/PostsRepository";
import { PostsMysqlRepository } from "./posts/PostsMysqlRepository";
import { PostTagsRepository } from "./posts/tags/PostTagsRepository";
import { PostTagsMysqlRepository } from "./posts/tags/PostTagsMysqlRepository";
import { PostCategoriesRepository } from "./posts/categories/PostCategoriesRepository";
import { PostCategoriesMysqlRepository } from "./posts/categories/PostCategoriesMysqlRepository";

export class Repository {

    private static repos: Record<string, any> = {};

    public static getPostRepository(): PostsRepository {
        return this.getRepository("posts", () => {
            return new PostsMysqlRepository();
        });
    }

    public static getPostTagsRepository(): PostTagsRepository {
        return this.getRepository("postTags", () => {
            return new PostTagsMysqlRepository();
        });
    }

    public static getPostCategoriesRepository(): PostCategoriesRepository {
        return this.getRepository("postCategories", () => {
            return new PostCategoriesMysqlRepository();
        })
    }

    private static getRepository(name: string, runner: Function) {
        if (!this.repos.hasOwnProperty(name)) {
            this.repos[name] = runner();
        }

        return this.repos[name];
    }
}