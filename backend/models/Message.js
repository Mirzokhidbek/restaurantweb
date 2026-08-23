import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    senderPhone: {
      type: String,
      required: true,
      trim: true,
    },
    senderEmail: {
      type: String,
      default: '',
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      default: 'Buyurtma bo‘yicha',
      enum: ['Buyurtma bo‘yicha', 'Yetkazib berish', 'To‘lov', 'Sifat va Taklif', 'Boshqa'],
    },
    messageText: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'resolved'],
      default: 'pending',
    },
    adminReply: {
      type: String,
      default: '',
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
