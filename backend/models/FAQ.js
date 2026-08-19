import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' }, // General, Delivery, Menu, Payment
    orderIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
