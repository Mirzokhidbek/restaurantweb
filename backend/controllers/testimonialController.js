/**
 * FAZO Restorani Namangan - Testimonials (Customer Reviews) Controller
 * 
 * Clean Code Architecture Principles:
 * - Single Responsibility Principle (SRP): Manages customer ratings & review submissions.
 * - Standardized API Response Format: { success: boolean, message: string, data: any }
 * - Rating Input Validation: Ensures 1 to 5 star rating boundary checks.
 */

import Testimonial from '../models/Testimonial.js';

/**
 * @desc    Get all customer testimonials (sorted newest first)
 * @route   GET /api/testimonials
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Sharhlar ro‘yxati muvaffaqiyatli olindi.',
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new customer testimonial review
 * @route   POST /api/testimonials
 * @access  Public
 * @param   {Object} req - Express request object (body: customerName, reviewText, rating, position, avatar)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const createTestimonial = async (req, res, next) => {
  try {
    const { customerName, reviewText, rating, position, avatar } = req.body;

    const trimmedName = customerName ? customerName.trim() : 'Mehmon';
    const trimmedReview = reviewText ? reviewText.trim() : '';

    if (!trimmedReview) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, sharhingiz matnini kiritishingiz shart.',
      });
    }

    const numericRating = Math.max(1, Math.min(5, Number(rating) || 5));

    const testimonial = await Testimonial.create({
      customerName: trimmedName,
      reviewText: trimmedReview,
      rating: numericRating,
      position: position ? position.trim() : 'Tasdiqlangan Mehmon',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });

    res.status(201).json({
      success: true,
      message: 'Sharhingiz muvaffaqiyatli chop etildi!',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a customer review by ID
 * @route   DELETE /api/testimonials/:id
 * @access  Private / Admin
 * @param   {Object} req - Express request object (params: id)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Sharh topilmadi.',
      });
    }

    await testimonial.deleteOne();

    res.json({
      success: true,
      message: 'Sharh muvaffaqiyatli o‘chirildi.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
