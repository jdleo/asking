const express = require('express');

const {
  createPoll,
  deletePoll,
  getPoll,
  updatePoll,
} = require('../controller/poll');

// router
const router = express.Router();

// map routes to controllers
router.get('/:id', getPoll);
router.post('/', createPoll);
router.put('/:id', updatePoll);
router.delete('/:id', deletePoll);

module.exports = router;
