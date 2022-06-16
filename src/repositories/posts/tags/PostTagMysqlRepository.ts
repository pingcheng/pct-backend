import { PostTagRepository } from 'src/repositories/posts/tags/PostTagRepository'
import { PostTagInterface } from 'src/models/posts/tags/PostTagInterface'
import DB from 'src/lib/database/DB'

export class PostTagMysqlRepository implements PostTagRepository {
  async getTagsByPostId (postId: number): Promise<Array<PostTagInterface>> {
    // get tags
    const rows = await DB.query(`
            SELECT id,
                   post_id,
                   tag
            FROM post_tags
            WHERE post_id = ?
        `, [
      postId
    ])

    const tags: Array<PostTagInterface> = []

    rows.forEach(row => {
      tags.push({
        id: row.id,
        postId: row.post_id,
        tag: row.tag
      })
    })

    return tags
  }

  async list (): Promise<Array<String>> {
    const rows = await DB.query(`
            SELECT DISTINCT tag
            FROM post_tags
            LIMIT 150
        `)

    return rows.map(row => row.tag)
  }
}
