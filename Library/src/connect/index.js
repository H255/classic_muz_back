import config from '../config/db.config.js';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: config.DB_PORT
})
sequelize.authenticate().then(function (err) {
  console.log('Connection has been established successfully.');
})
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

export default sequelize