const db = require('../../connections');
const Poll = require('../../model/Poll');

/**
 * @param {object} req - request object
 * @param {object} res - response object
 */
const deletePoll = (req, res) => {
  // get poll id from request
  const pollId = req.params.id;
  // get API_KEY from header
  const api_key = req.headers.api_key;

  // verify both are valid
  if (pollId === undefined || api_key === undefined) {
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized for this request.',
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

      // delete poll
      poll
        .destroy({ where: { id: pollId } })
        .then(() => {
          return res.status(200).json({
            status: 'success',
            error: 'Poll successfully destroyed.',
          });
        })
        .catch(() => {
          res.status(500).json({
            status: 'error',
            error: 'Poll unable to be destroyed.',
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

module.exports = deletePoll;
