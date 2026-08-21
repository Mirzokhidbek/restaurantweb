import Category from '../models/Category.js';

// @desc    Get all categories (sorted alphabetically by name)
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const { sort } = req.query;
    let sortOptions = { name: 1 }; // Default: alphabetical order A-Z

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

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
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

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Kategoriya nomi majburiy kiritilishi kerak.',
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Ushbu nomli kategoriya allaqachon mavjud.',
      });
    }

    const category = await Category.create({
      name,
      description: description || '',
      image: image || '',
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

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
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

    category.name = name || category.name;
    category.description = description !== undefined ? description : category.description;
    category.image = image !== undefined ? image : category.image;

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

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
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
