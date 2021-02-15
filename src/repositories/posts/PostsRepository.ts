import { PostSummaryInterface } from "../../models/posts/PostInterface";
import { PaginatedResponse } from "../../lib/responses/PaginatedResponse";

export interface PostsRepository {

    listPosts(perPage: number, page: number): Promise<PaginatedResponse<PostSummaryInterface>>
    
}