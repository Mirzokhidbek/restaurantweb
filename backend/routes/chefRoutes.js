import express from 'express';
import { getChefs, getChefById, createChef, updateChef, deleteChef } from '../controllers/chefController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getChefs)
  .post(protect, admin, createChef);

router.route('/:id')
  .get(getChefById)
  .put(protect, admin, updateChef)
  .delete(protect, admin, deleteChef);

export default router;
