/**
 * FAZO Restorani Namangan - Customer Support Messages Controller
 * 
 * Clean Code Architecture Principles:
 * - Single Responsibility Principle (SRP): Manages customer chat messages & inquiries.
 * - Standardized API Response Format: { success: boolean, message: string, data: any }
 * - Input Sanitization: String trimming and required field validation.
 */

import Message from '../models/Message.js';

/**
 * @desc    Submit a new customer support message / inquiry
 * @route   POST /api/messages
 * @access  Public
 */
export const createMessage = async (req, res, next) => {
  try {
    const { senderName, senderPhone, senderEmail, subject, messageText, userId } = req.body;

    const trimmedName = senderName ? senderName.trim() : '';
    const trimmedPhone = senderPhone ? senderPhone.trim() : '';
    const trimmedMessage = messageText ? messageText.trim() : '';

    if (!trimmedName || !trimmedPhone || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, ismingiz, telefon raqamingiz va xabar matnini kiritishingiz shart.',
      });
    }

    const message = await Message.create({
      senderName: trimmedName,
      senderPhone: trimmedPhone,
      senderEmail: senderEmail ? senderEmail.trim() : '',
      subject: subject || 'Buyurtma bo‘yicha',
      messageText: trimmedMessage,
      user: userId || null,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Murojaatingiz muvaffaqiyatli yuborildi. Admin tez orada javob beradi!',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all customer support messages / inquiries
 * @route   GET /api/messages
 * @access  Private / Admin
 */
export const getMessages = async (req, res, next) => {
  try {
    const { status, subject } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (subject && subject !== 'all') {
      query.subject = subject;
    }

    const messages = await Message.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Murojaatlar ro‘yxati muvaffaqiyatli olindi.',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update message status or append admin reply
 * @route   PUT /api/messages/:id/status
 * @access  Private / Admin
 */
export const updateMessageStatus = async (req, res, next) => {
  try {
    const { status, adminReply } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Murojaat topilmadi.',
      });
    }

    if (status) {
      message.status = status;
    }

    if (adminReply !== undefined) {
      message.adminReply = adminReply.trim();
    }

    const updatedMessage = await message.save();

    res.json({
      success: true,
      message: 'Murojaat holati muvaffaqiyatli yangilandi.',
      data: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete message inquiry record
 * @route   DELETE /api/messages/:id
 * @access  Private / Admin
 */
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Murojaat topilmadi.',
      });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Murojaat muvaffaqiyatli o‘chirildi.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
