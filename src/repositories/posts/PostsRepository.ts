import { PostSummaryInterface } from "../../models/posts/PostInterface";

export interface PostsRepository {

    listPosts(): Promise<Array<PostSummaryInterface>>
    
}