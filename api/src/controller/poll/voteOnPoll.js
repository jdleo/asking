const db = require('../../connections');
const Poll = require('../../model/Poll');
const Vote = require('../../model/Vote');
const randomId = require('../../helpers/randomId');

/**
 * @param {object} req - request object
 * @param {object} res - response object
 */
const voteOnPoll = (req, res) => {
  // get poll id from request
  const pollId = req.params.id;
  // get poll option
  const option = req.body.option;

  // look up associated poll
  Poll.findByPk(pollId)
    .then(poll => {
      // check if expired
      if (Date.now() > parseInt(poll.get('expiration'))) {
        return res.status(400).json({
          message: 'Poll has expired.',
        });
      }

      // key for this vote is based on limit_ip
      const id = poll.get('limit_ip') ? req.ip : randomId(16);

      // sync w db
      db.sync()
        .then(() => {
          // create new vote
          return Vote.create({
            id,
            pollId,
            option,
          });
        })
        .then(vote => {
          // return vote
          return res.status(200).json({
            status: 'success',
            data: vote,
          });
        })
        .catch(err => {
          // return error
          return res.status(500).json({
            status: 'error',
            message: err,
          });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({
        status: 'error',
        error: 'Poll not found with supplied ID.',
      });
    });
};

module.exports = voteOnPoll;
