import { PostInterface, PostSummaryInterface } from '../../../models/posts/PostInterface'
import { PaginatedResponseObject } from '../../../lib/responses/PaginatedResponse'

export interface ListPostOptions {
    perPage?: number,
    page?: number,
    tag?: string,
    categoryId?: number,
}

/**
 * Posts repository.
 */
export interface PostRepository {

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
