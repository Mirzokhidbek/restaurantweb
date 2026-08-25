import { generateAIResponse } from '../services/aiService.js';
import Message from '../models/Message.js';

// @desc    Chat with FAZO AI Afitsiant & Support Assistant
// @route   POST /api/ai/chat
// @access  Public
export const chatWithAI = async (req, res, next) => {
  try {
    const { message, history = [], senderName = 'Mijoz', senderPhone = '' } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, xabar matnini kiriting.',
      });
    }

    // Generate intelligent AI response from Gemini API
    const aiAnswer = await generateAIResponse(message.trim(), history);

    // Automatically save customer interaction to Message collection for Admin visibility
    try {
      await Message.create({
        senderName: senderName || 'Mijoz (AI Chat)',
        senderPhone: senderPhone || '+998 90 000 00 00',
        subject: 'AI Chatbot Murojaati',
        messageText: message.trim(),
        adminReply: aiAnswer,
        status: 'resolved',
      });
    } catch (saveErr) {
      console.warn('Could not auto-save AI conversation log:', saveErr.message);
    }

    res.json({
      success: true,
      data: {
        reply: aiAnswer,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in chatWithAI controller:', error.message);
    res.status(500).json({
      success: false,
      message: 'AI serverida vaqtincha uzilish yuz berdi. Qayta urinib ko‘ring.',
    });
  }
};
