import { Router } from 'express'
import { PostController } from '../../controllers/posts/PostController'

const postsRoutes = Router()

postsRoutes.get('/', PostController.list)
postsRoutes.get('/:slug', PostController.getPostBySlug)

export default postsRoutes
