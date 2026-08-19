import FAQ from '../models/FAQ.js';

export const getFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find({}).sort({ orderIndex: 1, createdAt: -1 });
    res.json({ success: true, message: 'FAQs retrieved', data: faqs });
  } catch (error) {
    next(error);
  }
};

export const createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, message: 'FAQ created', data: faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'FAQ deleted', data: {} });
  } catch (error) {
    next(error);
  }
};
