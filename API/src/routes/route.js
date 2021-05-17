import authorize from './subroutes/authorization.js';
import post from './subroutes/postroutes.js'
import comments from "./subroutes/comments.js";
import feedBack from "./subroutes/feedbackRoute.js";

class Routes {
  constructor(app) {
    app.use('/api/v1', authorize);
    app.use('/api/v1', post);
    app.use('/api/v1', comments);
    app.use('/api/v1', feedBack);
  }
}

export default Routes