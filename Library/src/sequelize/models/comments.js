import pkg from 'sequelize';
const { Sequelize, DataTypes, Model } = pkg;
import sequelize from '../../connect/index.js';

class Comments extends Model { };

Comments.init({
  tittle: DataTypes.STRING,
  content: DataTypes.STRING,
  postId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Comments',
});
Comments.show = async function (postId) {
  try {
    let comments = await Comments.findAll({ where: { postId } });
    return comments;
  } catch (error) { return error }
}
Comments.toComment = async function (tittle, content, postId) {
  try {
    let comment = Comments.create({
      tittle,
      content,
      postId
    })
    return { inserted: true };
  } catch (error) { return error }
}
export default Comments;