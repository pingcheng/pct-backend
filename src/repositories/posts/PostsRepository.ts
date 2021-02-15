import { PostInterface, PostSummaryInterface } from "../../models/posts/PostInterface";
import { PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";

/**
 * Posts repository.
 */
export interface PostsRepository {

    /**
     * List paginated posts.
     *
     * @param perPage
     * @param page
     */
    listPosts(perPage: number, page: number): Promise<PaginatedResponseObject<PostSummaryInterface>>

    /**
     * Get a post by its slug.
     *
     * @param slug
     */
    getPostBySlug(slug: string): Promise<PostInterface>;
    
}