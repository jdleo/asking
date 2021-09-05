const express = require('express');

import {
  createPoll,
  deletePoll,
  getPoll,
  updatePoll,
} from '../controller/poll';

// router
const router = express.Router();

// map routes to controllers
router.get('/:id', getPoll);
router.post('/', createPoll);
router.put('/:id', updatePoll);
router.delete('/:id', deletePoll);

export default router;
