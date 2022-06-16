import express from 'express'
import serverless from 'serverless-http'
import systemRoutes from './routes/system'
import postsRoutes from './routes/posts/postsRoutes'
import postCategoriesRoutes from './routes/posts/postCategoriesRoutes'
import { enableCors } from './routes/cors'
import rootRoutes from './routes/root'
import dotenv from 'dotenv'
import postTagsRoutes from './routes/posts/postTagsRoutes'

// Load the env variables.
dotenv.config()

// Create a new express app.
const app = express()

// Enable the CORS.
app.use(enableCors)

// Register routes.
app.use('/', rootRoutes)
app.use('/posts', postsRoutes)
app.use('/postCategories', postCategoriesRoutes)
app.use('/postTags', postTagsRoutes)
app.use('/system', systemRoutes)

// Export the handler for serverless lambda.
export const handler = serverless(app)
