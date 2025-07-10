import express from 'express';
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
import validateItem from '../validators/validateItem.js';

const router = express.Router();

// Use controller functions here
router.get('/', getAllItems);
router.post('/', validateItem, createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
