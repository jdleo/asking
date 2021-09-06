const { Sequelize } = require('sequelize');

// connect to database
const sequelize = new Sequelize(process.env.DATABASE_URI);

// test connection
sequelize
  .authenticate()
  .then(() => {
    console.info('api has successfully connected to database.');
  })
  .catch(err => {
    console.error('api has failed to connect to database.', err);
  });

module.exports = sequelize;
