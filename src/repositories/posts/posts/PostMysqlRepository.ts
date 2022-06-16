import { PostRepository } from 'src/repositories/posts/posts/PostRepository'
import { PostInterface, PostSummaryInterface } from 'src/models/posts/PostInterface'
import DB from 'src/lib/database/DB'
import { PaginatedResponse, PaginatedResponseObject } from 'src/lib/responses/PaginatedResponse'
import { PostStatus } from 'src/models/posts/PostStatus'

export class PostMysqlRepository implements PostRepository {
  async listPosts (options): Promise<PaginatedResponseObject<PostSummaryInterface>> {
    const perPage = options.perPage || 5
    const page = options.page || 1
    const categoryId = options.categoryId
    const tag = options.tag

    // get posts
    const rows = await DB.query(`
            SELECT post.id,
                   post.title,
                   post.slug,
                   SUBSTRING(post.content, 1, 500) AS content,
                   post.created_at
            FROM posts AS post
            ${tag !== null
            ? 'JOIN post_tags AS tag ON tag.post_id = post.id'
            : ''}
            WHERE post.status = :status
            ${categoryId !== null ? 'AND post.category = :categoryId' : ''}
            ${tag !== null ? 'AND tag.tag = :tag ' : ''}
            ORDER BY post.id DESC
            LIMIT :limit OFFSET :offset
        `, {
      status: PostStatus.PUBLISHED,
      limit: perPage,
      offset: (page - 1) * perPage,
      categoryId,
      tag
    })
    const posts: PostSummaryInterface[] = []

    const total = await DB.query(`
            SELECT COUNT(1) AS total
            FROM posts AS post
            ${tag !== null
            ? 'JOIN post_tags AS tag ON tag.post_id = post.id'
            : ''}
            WHERE post.status = :status
            ${categoryId !== null ? 'AND post.category = :categoryId' : ''}
            ${tag !== null ? 'AND tag.tag = :tag ' : ''}
        `, {
      status: PostStatus.PUBLISHED,
      categoryId,
      tag
    })

    for (const row of rows) {
      posts.push({
        id: row.id,
        title: row.title,
        content: row.content,
        slug: row.slug,
        timeCreated: row.created_at
      })
    }

    return PaginatedResponse.with({
      items: posts,
      totalItems: total[0].total,
      perPage,
      currentPage: page
    })
  }

  async getPostBySlug (slug: string): Promise<PostInterface> {
    // get post data
    const posts = await DB.query(`
            SELECT id,
                   category as category_id,
                   title,
                   content,
                   status,
                   slug,
                   created_at,
                   updated_at
            FROM posts
            WHERE slug = ?
            AND status = ?
        `, [
      slug,
      PostStatus.PUBLISHED
    ])

    // If no posts found, return null
    if (posts.length === 0) {
      return null
    }

    const post = posts[0]

    return {
      id: post.id,
      categoryId: post.category_id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      status: post.status,
      allowComments: false,
      timeCreated: post.created_at,
      timeUpdated: post.updated_at
    }
  }
}
