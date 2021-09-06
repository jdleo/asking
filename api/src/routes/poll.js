const express = require('express');

const {
  createPoll,
  deletePoll,
  getPoll,
  updatePoll,
  voteOnPoll,
} = require('../controller/poll');

// router
const router = express.Router();

// map routes to controllers
router.get('/:id', getPoll);
router.post('/', createPoll);
router.put('/:id', updatePoll);
router.put('/:id/vote', voteOnPoll);
router.delete('/:id', deletePoll);

module.exports = router;
