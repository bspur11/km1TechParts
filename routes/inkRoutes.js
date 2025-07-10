import express from 'express';

import {
  getAllInks,
  createInk,
  updateInk,
  deleteInk,
} from '../controllers/inkController.js';

const router = express.Router();

router.get('/', getAllInks);
router.post('/', createInk);
router.put('/:id', updateInk);
router.delete('/:id', deleteInk);

export default router;
