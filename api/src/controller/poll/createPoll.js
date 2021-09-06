const db = require('../../connections');
const Poll = require('../../model/Poll');
const randomId = require('../../helpers/randomId');

/**
 * @param {object} req - request object
 * @param {object} res - response object
 */
const createPoll = (req, res) => {
  // get required parameters
  const { title, options, expiration, limit_ip } = req.body;

  // check if any are undefined
  if (
    title === undefined ||
    options === undefined ||
    expiration === undefined ||
    limit_ip === undefined
  ) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required parameters',
    });
  }

  // sync w db
  db.sync()
    .then(() => {
      // create new poll
      return Poll.create({
        id: randomId(16),
        api_key: randomId(16),
        title,
        options,
        expiration,
        limit_ip,
      });
    })
    .then(poll => {
      // return poll
      return res.status(200).json({
        status: 'success',
        data: poll,
      });
    })
    .catch(err => {
      // return error
      return res.status(500).json({
        status: 'error',
        message: err,
      });
    });
};

module.exports = createPoll;
