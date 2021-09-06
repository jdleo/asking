const db = require('../connections');
const Sequelize = require('sequelize');
const Poll = require('./Poll');

// create vote model
const Vote = db.define('vote', {
  id: { primaryKey: true, type: Sequelize.STRING },
});

// add foreign key relationship to poll
Vote.belongsTo(Poll);

module.exports = Vote;
