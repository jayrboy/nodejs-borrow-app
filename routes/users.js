import express from 'express';
import { getUsers, addMoney } from '../controllers/users-controller.js';

const router = express.Router();

// GET: /api/users
router.get('/users', getUsers);

// POST: /api/add/money
router.post('/add/money', addMoney);

export default router;
