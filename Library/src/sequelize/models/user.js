import pkg from 'sequelize';
import bcrypt from 'bcrypt';
const { Sequelize, DataTypes, Model } = pkg;
import Helper from '../../../../API/src/helper/helper.js';
import sequelize from '../../connect/index.js';

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUnique: function(value, next) {
        Helper.isUnique(User,'email', value, next)
      },
      isEmail:true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name,
  timestamps: false
});

User.authenticate = async function(username, password) {
  const user = await User.findOne({ where: { email: username } });
  let userPassword = user.password.replace(/^\$2y(.+)$/i, '$2a$1');
  if (bcrypt.compareSync(password, userPassword)) {
    return user
  }
  throw new Error('invalid password');
}

User.register = async function(email, password, username){
  let hashedPass = await bcrypt.hash(password, 10)
    let user = await User.create({
      username:username,
      email:email,
      password:hashedPass
    })
    return user
}

export default User