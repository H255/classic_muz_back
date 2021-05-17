'use strict';
import pkg from 'sequelize';
const { Sequelize, DataTypes, Model } = pkg;
import sequelize from '../../connect/index.js';


class FeedBack extends Model { }


FeedBack.init({
  firstName: DataTypes.STRING,
  email: DataTypes.STRING,
  feedback: DataTypes.STRING
}, {
  sequelize,
  modelName: 'FeedBack',
});

FeedBack.do = async function (payload) {
  const { email, firstName, data } = payload
  try {
    let fb = await FeedBack.create({
      firstName,
      email,
      feedback: data
    })
    return fb;
  } catch (error) {
    return {error: error, status:450}
  }
}

FeedBack.get = async function() {
  try {
    let data = await FeedBack.findAll({});
    return data
  } catch(error) {
    return error
  }
}

export default FeedBack;