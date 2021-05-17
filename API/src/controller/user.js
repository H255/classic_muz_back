import Helper from './../helper/helper.js';
import User from '../../../Library/src/sequelize/models/user.js';
import bcrypt from 'bcrypt';
class UserController {
    constructor() {
    }

    async login(req, res, next) {
        /* 	#swagger.tags = ['User']
            #swagger.description = 'Endpoint to sign in a specific user' */
        /*	#swagger.parameters['data'] = {
                in: 'body',
                description: 'User credentials.',
                required: true,
                schema: { $ref: "#/definitions/UserLogin" }
        } */

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(403).send({
                error: 'Request missing username or password param'
            });
        }
        try {
            let user = await User.authenticate(username, password)
            const token = Helper.generateAccessToken({ username: user.username });
            console.log(token);
            res.status(200).send({
                token,
                id: user.id,
                email: user.email,
                username: user.username
            });
        } catch (err) {
            return res.status(403).send({
                error: 'invalid username or password',
            });
        }
    }

    async register(req, res, next) {
        /* 	#swagger.tags = ['User']
            #swagger.description = 'Endpoint to sign up a specific user' */
        /*	#swagger.parameters['data'] = {
                in: 'body',
                description: 'User credentials.',
                required: true,
                schema: { $ref: "#/definitions/UserRegister" }
        } */
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            return res.status(403).send({
                error: 'Please fill all the inputs'
            });
        }
        try {
            let user = await User.register(email, password, username)
            return res.status(200).send(user);
        } catch (err) {
            const errObj = {};
            err.errors.map(er => {
                errObj[er.path] = er.message;
            })
            return res.status(403).send({
                'error': errObj
            });
        }
    }


    logout() {

    }
}
export default new UserController()