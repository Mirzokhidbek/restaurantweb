import express from 'express';
import {
  loginUser,
  registerCustomer,
  getMe,
  updateProfile,
  addAddress,
  removeAddress,
  getMyOrders,
  forgotPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerCustomer);
router.post('/forgot-password', forgotPassword);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/address', protect, addAddress);
router.delete('/address/:addressId', protect, removeAddress);
router.get('/my-orders', protect, getMyOrders);

export default router;
