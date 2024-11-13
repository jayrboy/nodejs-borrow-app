import express from 'express';
import {
  getUsers,
  addMoney,
  addBorrow,
} from '../controllers/users-controller.js';

const router = express.Router();

// GET: /api/users
router.get('/users', getUsers);

// POST: /api/add/money
router.post('/add/money', addMoney);

// POST: /api/add/borrow
router.post('/add/borrow', addBorrow);

export default router;
