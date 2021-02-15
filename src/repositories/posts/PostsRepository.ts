import { PostInterface, PostSummaryInterface } from "../../models/posts/PostInterface";
import { PaginatedResponseObject } from "../../lib/responses/PaginatedResponse";

export interface PostsRepository {

    listPosts(perPage: number, page: number): Promise<PaginatedResponseObject<PostSummaryInterface>>

    getPostBySlug(slug: string): Promise<PostInterface>;
    
}