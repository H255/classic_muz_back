import FeedBack from "../../../Library/src/sequelize/models/feedback.js"

class FeedBackController {

  async do(req, res, next) {
    const { firstName, email, data } = req.body
    if (!firstName || !email || !data) {
      return res.status(400).send({
        error: "Please Fill All the Inputs"
      })
    }
    try {
      let addData = await FeedBack.do(req.body, res)
      if (addData.status) {
        return res.status(450).send({
          error: "Something Went Wrong"
        })
      }
      return res.status(200).send({
        feedBack: addData
      });
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        error: error
      })
    }
  }
  async get(req, res, next) {
    try {
      let feedBacks = await FeedBack.get()
      return res.status(200).send({ feedBacks })
    } catch (error) {
      return res.status(450).send({
        error: error
      })
    }
  }
}
export default new FeedBackController()