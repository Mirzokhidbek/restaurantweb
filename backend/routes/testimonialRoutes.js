import express from 'express';
import { getTestimonials, createTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(createTestimonial);

router.delete('/:id', protect, admin, deleteTestimonial);

export default router;
