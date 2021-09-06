const db = require('../connections');
const Sequelize = require('sequelize');

// create poll model
const Poll = db.define('poll', {
  id: { primaryKey: true, type: Sequelize.STRING },
  title: Sequelize.STRING,
  options: Sequelize.ARRAY(Sequelize.STRING),
  expiration: Sequelize.BIGINT,
  limit_ip: Sequelize.BOOLEAN,
  api_key: Sequelize.STRING,
});

module.exports = Poll;
