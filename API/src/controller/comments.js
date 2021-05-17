import Helper from './../helper/helper.js';
import User from '../../../Library/src/sequelize/models/user.js';
import bcrypt from 'bcrypt';
import Comments from '../../../Library/src/sequelize/models/comments.js';

class CommentController {
    constructor() {
    }

    async show(req, res, next) {
        try{
            let postId = req.params.postId
            let comments = await Comments.show(postId)
            return res.status(200).send({
                comments: comments
            });
        }catch(error){
            return res.status(403).send({
                error: error
            })
        }
    }

    async toComment(req, res, next) {
        try{ 
            const { tittle, content, postId } = req.body
            if( !tittle || !content || !postId){
                return res.status(400).send({
                    error: "Fill all inputs"
                })
            }
            let send = await Comments.toComment(tittle, content, postId)
            return res.status(200).send({
                send: send
            });
        }catch(error) { return error }
    }

}
export default new CommentController()