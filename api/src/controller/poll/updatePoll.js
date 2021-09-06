const Poll = require('../../model/Poll');

/**
 * @param {object} req - request object
 * @param {object} res - response object
 */
const updatePoll = (req, res) => {
  // get poll id from request
  const pollId = req.params.id;
  // get API_KEY from header
  const api_key = req.headers.api_key;
  // get expiration from body
  const expiration = req.body.expiration;

  // verify all are valid
  if (pollId === undefined || api_key === undefined || expiration === undefined) {
    return res.status(400).json({
      status: 'error',
      error: 'Invalid request.',
    });
  }

  // look up associated poll
  Poll.findByPk(pollId)
    .then(poll => {
      const target_api_key = poll.get('api_key');

      // verify API_KEY matches
      if (api_key !== target_api_key) {
        return res.status(401).json({
          status: 'error',
          error: 'Unauthorized for this request.',
        });
      }

      // update poll
      Poll.update({ expiration }, { where: { id: pollId } })
        .then(() => {
          return res.status(200).json({
            status: 'success',
            error: 'Poll successfully updated.',
          });
        })
        .catch(() => {
          res.status(500).json({
            status: 'error',
            error: 'Poll unable to be updated.',
          });
        });
    })
    .catch(() => {
      res.status(404).json({
        status: 'error',
        error: 'Poll not found with supplied ID.',
      });
    });
};

module.exports = updatePoll;
