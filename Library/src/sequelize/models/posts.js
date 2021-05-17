import pkg from 'sequelize';
const { Sequelize, DataTypes, Model } = pkg;
import sequelize from '../../connect/index.js';

class Posts extends Model { }

Posts.init({
  header: DataTypes.STRING,
  data: DataTypes.TEXT,
  photo: DataTypes.STRING,
  youtube: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Posts',
});

Posts.input = async function (header, data, youtube, photo) {
  try {
    let post = await Posts.create({
      header,
      data,
      photo,
      youtube
    })
    return photo;
  } catch (error) { return error }
}

Posts.headers = async function () {
  try {
    let headers = await Posts.findAll({ attributes: ['id', 'header'] })
    return headers
  } catch (error) {
    return error
  }
}

Posts.post = async function (id) {
  try {
    let post = await Posts.findOne({ where: { id } });
    if(!post) {
      return -1;
    }
    return post;
  } catch (error) {
    return error;
  }
}

Posts.comment = async function (id) {
  try {
    let comment = await Posts.findOne({ where: { id } });
    if(!comment) {
      return -1;
    }
    return comment;
  } catch (error) {
    return error;
  }
}
export default Posts;