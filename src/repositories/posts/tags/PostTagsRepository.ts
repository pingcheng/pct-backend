import { PostTagInterface } from "../../../models/posts/tags/PostTagInterface";

export interface PostTagsRepository {

    /**
     * List all existing post tags.
     */
    list(): Promise<Array<String>>

    getTagsByPostId(postId: number): Promise<Array<PostTagInterface>>

}