import { PostTagInterface } from 'src/models/posts/tags/PostTagInterface'

export interface PostTagRepository {

    /**
     * List all existing post tags.
     */
    list(): Promise<Array<String>>

    getTagsByPostId(postId: number): Promise<Array<PostTagInterface>>

}
