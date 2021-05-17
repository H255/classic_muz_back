import Router from 'express';
import UserController  from './../../controller/user.js'
const authorize = Router();

authorize.post('/register', UserController.register)
authorize.post('/login', UserController.login)
// router.get('/logout', UserController.logout)

export default authorize