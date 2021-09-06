const Poll = require('../../model/Poll');

/**
 * @param {object} req - request object
 * @param {object} res - response object
 */
const getPoll = (req, res) => {
  // get poll id from request
  const pollId = req.params.id;

  // verify param is valid
  if (pollId === undefined) {
    return res.status(400).json({
      status: 'error',
      error: 'Invalid request.',
    });
  }

  // look up associated poll
  Poll.findByPk(pollId)
    .then(poll => {
      // send poll back to client
      return res.status(200).json(poll.get({ plain: true }));
    })
    .catch(() => {
      res.status(404).json({
        status: 'error',
        error: 'Poll not found with supplied ID.',
      });
    });
};

module.exports = getPoll;
