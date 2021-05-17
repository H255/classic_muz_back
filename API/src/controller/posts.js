import Posts from "../../../Library/src/sequelize/models/posts.js"

class PostController {
  constructor() {
  }
  async input(req, res, next) {
    const { header, data, youtube, photo } = req.body;
    if (!header || !data) {
      return res.status(400).send({
        error: "Missing Header Or Data"
      })
    }
    try {
      let dataFill = await Posts.input(header, data, youtube, photo)
      res.status(200).send({
        success: "Your Post Was Created Successfuly!"
      })
    } catch (error) {
      return res.status(450).send({
        error: "Something Went Wrong Try Agian Later."
      })
    }
  }

  async headers(req, res, next) {
    try {
      let postsHeaders = await Posts.headers()
      res.status(200).send({
        postsHeaders
      })
    } catch (error) {
      return res.status(450).send({
        error
      })
    }
  }

  async post(req, res, next) {
    try {
      let postId = req.params.id
      let post = await Posts.post(postId);
      if(post === -1) {
        return res.status(200).send({
          post: 'there Is no Post With This Id'
        });
      }
      return res.status(200).send({
        post
      });
    } catch (error) {
      return res.status(450).send({
        error
      })
    }
  }

}

export default new PostController()