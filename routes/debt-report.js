import express from 'express';
import {
  getTransactions,
  getTransactionSummary,
} from '../controllers/debt-report-controller.js';

const router = express.Router();

// GET: /api/debt-report
router.get('/debt-report/:id', getTransactionSummary);

// GET: /api/transactions
router.get('/transactions', getTransactions);

export default router;
