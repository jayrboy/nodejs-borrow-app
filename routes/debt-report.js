import express from 'express';
import { getTransactionSummary } from '../controllers/debt-report-controller.js';

const router = express.Router();

// GET: /api/debt-report
router.get('/debt-report/:id', getTransactionSummary);

export default router;
