import { PostInterface, PostSummaryInterface } from "../../models/posts/PostInterface";
import { PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";

/**
 * Posts repository.
 */
export interface PostsRepository {

    /**
     * List paginated posts.
     *
     * @param options
     */
    listPosts(options?: ListPostOptions): Promise<PaginatedResponseObject<PostSummaryInterface>>

    /**
     * Get a post by its slug.
     *
     * @param slug
     */
    getPostBySlug(slug: string): Promise<PostInterface>;
    
}

export interface ListPostOptions {
    perPage?: number,
    page?: number,
    tag?: string,
    categoryId?: number,
}