import Router from 'express';
import { getHeapSnapshot } from 'v8';
import FeedBackController from './../../controller/feedBack.js'
const feedBack = Router()

feedBack.post('/do', FeedBackController.do)
feedBack.get('/feedbacks', FeedBackController.get)

export default feedBack;