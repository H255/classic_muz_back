import Router from 'express';
import CommentController from '../../controller/comments.js'
const comments = Router()

comments.get('/comments/:postId', CommentController.show);
comments.post('/toComments/', CommentController.toComment);

export default comments;