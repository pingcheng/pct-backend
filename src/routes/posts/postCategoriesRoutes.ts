import { Router } from 'express'
import { PostCategoryController } from '../../controllers/posts/PostCategoryController'

const postCategoriesRoutes = Router()

postCategoriesRoutes.get('/', PostCategoryController.list)

export default postCategoriesRoutes
