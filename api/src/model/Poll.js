const db = require('../connections');
const Sequelize = require('sequelize');

// create poll model
const Poll = db.define('poll', {
  title: Sequelize.STRING,
  options: Sequelize.ARRAY(Sequelize.STRING),
  expiration: Sequelize.BIGINT,
  limit_ip: Sequelize.BOOLEAN,
  api_key: Sequelize.STRING,
  created_at: Sequelize.DATE,
});

module.exports = Poll;
