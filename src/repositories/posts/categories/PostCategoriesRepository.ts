import { PostCategoryInterface } from "../../../models/posts/categories/PostCategoryInterface";

export interface PostCategoriesRepository {

    /**
     * List all post categories.
     */
    list(): Promise<Array<PostCategoryInterface>>;

    /**
     * Get a post category by its ID.
     *
     * @param categoryId
     */
    getById(categoryId: number): Promise<PostCategoryInterface>;
}