import express from 'express';
import { createTransactionType } from '../controllers/transaction-type-controller.js';

const router = express.Router();

// POST: /api/transaction-type
router.post('/transaction-type', createTransactionType);

export default router;
