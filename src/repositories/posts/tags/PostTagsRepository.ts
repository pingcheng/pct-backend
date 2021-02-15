import { PostTagInterface } from "../../../models/posts/tags/PostTagInterface";

export interface PostTagsRepository {

    getTagsByPostId(postId: number): Promise<Array<PostTagInterface>>

}