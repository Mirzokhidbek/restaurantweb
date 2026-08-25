import express from 'express';
import { chatWithAI } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', chatWithAI);

export default router;
