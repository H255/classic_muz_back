import Router from 'express';
import PostController from './../../controller/posts.js'
const posts = Router()

posts.post('/input', PostController.input)
posts.get('/headers', PostController.headers)
posts.get('/post/:id', PostController.post)

export default posts;