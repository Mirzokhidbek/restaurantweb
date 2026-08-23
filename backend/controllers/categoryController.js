/**
 * FAZO Restorani Namangan - Category Controller
 * 
 * Clean Code Architecture Principles:
 * - Single Responsibility Principle (SRP): Handles Category CRUD operations only.
 * - Standardized API Response Format: { success: boolean, message: string, data: any }
 * - Input Sanitation: String trimming and case-insensitive uniqueness validation.
 * - Consistent Error Handling via Express Next Middleware.
 */

import Category from '../models/Category.js';

/**
 * @desc    Get all categories with dynamic query sorting options
 * @route   GET /api/categories
 * @access  Public
 * @param   {Object} req - Express request object (supports query: ?sort=newest|oldest|name)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const getCategories = async (req, res, next) => {
  try {
    const { sort } = req.query;

    let sortOptions = { name: 1 }; // Default: Alphabetical order (A-Z)

    if (sort === 'newest') {
      sortOptions = { createdAt: -1 };
    } else if (sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    }

    const categories = await Category.find({}).sort(sortOptions);

    res.json({
      success: true,
      message: 'Kategoriyalar ro‘yxati muvaffaqiyatli olindi.',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single category by MongoDB ObjectId
 * @route   GET /api/categories/:id
 * @access  Public
 * @param   {Object} req - Express request object (params: id)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategoriya topilmadi.',
      });
    }

    res.json({
      success: true,
      message: 'Kategoriya ma’lumotlari olindi.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new food category
 * @route   POST /api/categories
 * @access  Private / Admin
 * @param   {Object} req - Express request object (body: name, description, image)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;

    const trimmedName = name ? name.trim() : '';

    if (!trimmedName) {
      return res.status(400).json({
        success: false,
        message: 'Kategoriya nomi majburiy kiritilishi kerak.',
      });
    }

    // Case-insensitive duplicate check
    const existingCategory = await Category.findOne({
      name: { $regex: `^${trimmedName}$`, $options: 'i' },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Ushbu nomli kategoriya allaqachon mavjud.',
      });
    }

    const category = await Category.create({
      name: trimmedName,
      description: description ? description.trim() : '',
      image: image ? image.trim() : '',
    });

    res.status(201).json({
      success: true,
      message: 'Kategoriya muvaffaqiyatli yaratildi.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing food category details
 * @route   PUT /api/categories/:id
 * @access  Private / Admin
 * @param   {Object} req - Express request object (params: id, body: name, description, image)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategoriya topilmadi.',
      });
    }

    if (name && name.trim() !== '') {
      const trimmedName = name.trim();

      // Check if new name conflicts with another existing category
      const conflictCategory = await Category.findOne({
        _id: { $ne: category._id },
        name: { $regex: `^${trimmedName}$`, $options: 'i' },
      });

      if (conflictCategory) {
        return res.status(400).json({
          success: false,
          message: 'Ushbu nomli kategoriya allaqachon mavjud.',
        });
      }

      category.name = trimmedName;
    }

    if (description !== undefined) {
      category.description = description ? description.trim() : '';
    }

    if (image !== undefined) {
      category.image = image ? image.trim() : '';
    }

    const updatedCategory = await category.save();

    res.json({
      success: true,
      message: 'Kategoriya ma’lumotlari muvaffaqiyatli yangilandi.',
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete category by MongoDB ObjectId
 * @route   DELETE /api/categories/:id
 * @access  Private / Admin
 * @param   {Object} req - Express request object (params: id)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategoriya topilmadi.',
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: 'Kategoriya muvaffaqiyatli o‘chirildi.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
