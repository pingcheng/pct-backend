import { PostSummaryInterface } from "../../models/posts/PostInterface";

export interface PostsRepository {

    listPosts(perPage: number, page: number): Promise<{
        items: Array<PostSummaryInterface>
        total: number
        perPage: number
        currentPage: number
        totalPages: number
    }>
    
}