import Helper from '../helper/helper.js'
class Middleware {
  static isLoggedIn(req, res, next) {
    const token = req.get('user_token')
    if (token && Helper.decodeRegistrationToken(token)) {
      next();
    } else {
      // return unauthorized
      res.send(401, "Unauthorized");
    }
  }
}
export default Middleware