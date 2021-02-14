import { PostsRepository } from "./posts/PostsRepository";
import { PostsMysqlRepository } from "./posts/PostsMysqlRepository";

export class Repository {

    private static repos: Record<string, any> = {};

    public static getPostRepository(): PostsRepository {
        return this.getRepository("posts", () => {
            return new PostsMysqlRepository();
        });
    }

    private static getRepository(name: string, runner: Function) {
        if (!this.repos.hasOwnProperty(name)) {
            this.repos[name] = runner();
        }

        return this.repos[name];
    }
}