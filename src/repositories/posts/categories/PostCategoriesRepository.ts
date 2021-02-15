import { PostCategoryInterface } from "../../../models/posts/categories/PostCategoryInterface";

export interface PostCategoriesRepository {

    /**
     * Get a post category by its ID.
     *
     * @param categoryId
     */
    getById(categoryId: number): Promise<PostCategoryInterface>;
}