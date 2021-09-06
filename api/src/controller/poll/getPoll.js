const Poll = require('../../model/Poll');
const db = require('../../connections');
const { QueryTypes } = require('sequelize');

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
      // get fields that we should expose
      const title = poll.get('title');
      const options = poll.get('options');
      const createdAt = poll.get('createdAt');
      const expiration = poll.get('expiration');

      // raw query string
      let query = `
        SELECT option, count(option) as vote_count
        FROM votes
        WHERE "pollId" = '${pollId}'
        GROUP BY option;
      `;

      // execute query
      db.query(query, { type: QueryTypes.SELECT })
        .then(res => {
          // return poll data
          return res.status(200).json({
            status: 'success',
            data: {
              title,
              options,
              createdAt,
              expiration,
              votes: res,
            },
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            status: 'error',
            error: 'Unable to retrieve poll results.',
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

module.exports = getPoll;
