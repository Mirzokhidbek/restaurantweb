import express from 'express';
import {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createMessage)
  .get(protect, admin, getMessages);

router.route('/:id/status')
  .put(protect, admin, updateMessageStatus);

router.route('/:id')
  .delete(protect, admin, deleteMessage);

export default router;
