import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getStats,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createOrder)
  .get(protect, admin, getOrders);

router.get('/stats/dashboard', protect, admin, getStats);

router.route('/:id')
  .get(getOrderById)
  .delete(protect, admin, deleteOrder);

router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
