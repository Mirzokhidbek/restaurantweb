import express from 'express';
import { getFAQs, createFAQ, deleteFAQ } from '../controllers/faqController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getFAQs)
  .post(protect, admin, createFAQ);

router.delete('/:id', protect, admin, deleteFAQ);

export default router;
