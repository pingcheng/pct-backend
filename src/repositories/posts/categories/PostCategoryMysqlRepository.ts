import { PostCategoryRepository } from 'src/repositories/posts/categories/PostCategoryRepository'
import { PostCategoryInterface } from 'src/models/posts/categories/PostCategoryInterface'
import DB from 'src/lib/database/DB'

export class PostCategoryMysqlRepository implements PostCategoryRepository {
  async getById (categoryId: number): Promise<PostCategoryInterface> {
    const rows = await DB.query(`
            SELECT id,
                   name
            FROM post_categories
            WHERE id = ?
            LIMIT 1
        `, [
      categoryId
    ])

    if (rows.length === 0) {
      return null
    }

    const category = rows[0]

    return {
      id: category.id,
      name: category.name
    }
  }

  async list (): Promise<Array<PostCategoryInterface>> {
    const rows = await DB.query(`
            SELECT id,
                name
            FROM post_categories   
        `)

    const categories: Array<PostCategoryInterface> = []

    rows.forEach(row => {
      categories.push({
        id: row.id,
        name: row.name
      })
    })

    return categories
  }
}
