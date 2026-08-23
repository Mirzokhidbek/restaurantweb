/**
 * FAZO Restorani Namangan - Master Chefs Controller
 * 
 * Clean Code Architecture Principles:
 * - Single Responsibility Principle (SRP): Handles restaurant chef profiles & team management.
 * - Standardized API Response Format: { success: boolean, message: string, data: any }
 * - Input Sanitization: Trimming string inputs and validating required fields.
 */

import Chef from '../models/Chef.js';

/**
 * @desc    Get all master chefs (sorted by experience years or creation order)
 * @route   GET /api/chefs
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const getChefs = async (req, res, next) => {
  try {
    const chefs = await Chef.find({}).sort({ experienceYears: -1, createdAt: 1 });

    res.json({
      success: true,
      message: 'Oshpazlar ro‘yxati muvaffaqiyatli olindi.',
      data: chefs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single chef profile details by ID
 * @route   GET /api/chefs/:id
 * @access  Public
 * @param   {Object} req - Express request object (params: id)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const getChefById = async (req, res, next) => {
  try {
    const chef = await Chef.findById(req.params.id);

    if (!chef) {
      return res.status(404).json({
        success: false,
        message: 'Oshpaz ma’lumotlari topilmadi.',
      });
    }

    res.json({
      success: true,
      message: 'Oshpaz profil ma’lumotlari olindi.',
      data: chef,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a new master chef to the team
 * @route   POST /api/chefs
 * @access  Private / Admin
 * @param   {Object} req - Express request object (body: name, title, bio, image, experienceYears, specialty)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const createChef = async (req, res, next) => {
  try {
    const { name, title, bio, image, experienceYears, specialty } = req.body;

    const trimmedName = name ? name.trim() : '';
    const trimmedTitle = title ? title.trim() : '';

    if (!trimmedName || !trimmedTitle) {
      return res.status(400).json({
        success: false,
        message: 'Oshpaz ismi va lavozimi majburiy kiritilishi kerak.',
      });
    }

    const chef = await Chef.create({
      name: trimmedName,
      title: trimmedTitle,
      bio: bio ? bio.trim() : '',
      image: image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      experienceYears: Number(experienceYears) || 5,
      specialty: specialty ? specialty.trim() : 'Bosh Oshpaz',
    });

    res.status(201).json({
      success: true,
      message: 'Yangi oshpaz muvaffaqiyatli qo‘shildi.',
      data: chef,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing chef details
 * @route   PUT /api/chefs/:id
 * @access  Private / Admin
 * @param   {Object} req - Express request object (params: id, body: name, title, bio, image, experienceYears, specialty)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const updateChef = async (req, res, next) => {
  try {
    const chef = await Chef.findById(req.params.id);

    if (!chef) {
      return res.status(404).json({
        success: false,
        message: 'Oshpaz topilmadi.',
      });
    }

    if (req.body.name) chef.name = req.body.name.trim();
    if (req.body.title) chef.title = req.body.title.trim();
    if (req.body.bio !== undefined) chef.bio = req.body.bio.trim();
    if (req.body.image) chef.image = req.body.image.trim();
    if (req.body.experienceYears !== undefined) chef.experienceYears = Number(req.body.experienceYears);
    if (req.body.specialty) chef.specialty = req.body.specialty.trim();

    const updatedChef = await chef.save();

    res.json({
      success: true,
      message: 'Oshpaz ma’lumotlari muvaffaqiyatli yangilandi.',
      data: updatedChef,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove chef from the team by ID
 * @route   DELETE /api/chefs/:id
 * @access  Private / Admin
 * @param   {Object} req - Express request object (params: id)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const deleteChef = async (req, res, next) => {
  try {
    const chef = await Chef.findById(req.params.id);

    if (!chef) {
      return res.status(404).json({
        success: false,
        message: 'Oshpaz topilmadi.',
      });
    }

    await chef.deleteOne();

    res.json({
      success: true,
      message: 'Oshpaz muvaffaqiyatli o‘chirildi.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
