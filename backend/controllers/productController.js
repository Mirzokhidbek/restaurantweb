/**
 * FAZO Restorani Namangan - Product (Food Dish) Controller
 * 
 * Clean Code Architecture Principles:
 * - Single Responsibility Principle (SRP): Manages food dish menu inventory CRUD operations.
 * - Standardized API Response Format: { success: boolean, message: string, data: any }
 * - Dynamic Query Filtering & Sorting: Supports category, search keyword, popularity, and price sorting.
 * - Input Sanitization: Explicit string trimming, number type conversion, and category validation.
 */

import Product from '../models/Product.js';

/**
 * @desc    Get all food products with optional category filtering, text search, and dynamic sorting
 * @route   GET /api/products
 * @access  Public
 * @param   {Object} req - Express request object (query: ?category=&search=&popular=&sort=price_asc|price_desc|name_asc|popular)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, popular, sort } = req.query;
    const query = {};

    // Filter by specific Category ID or Name (excluding 'All' wildcard)
    if (category && category !== 'All' && category !== 'all') {
      query.category = category;
    }

    // Filter by Popular Highlight flag
    if (popular === 'true') {
      query.isPopular = true;
    }

    // Case-insensitive text search by product name
    if (search && search.trim() !== '') {
      query.name = { $regex: search.trim(), $options: 'i' };
    }

    // Dynamic Query Sorting Options
    let sortOptions = { createdAt: -1 }; // Default: Newest products first
    if (sort === 'price_asc') {
      sortOptions = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOptions = { price: -1 };
    } else if (sort === 'name_asc') {
      sortOptions = { name: 1 };
    } else if (sort === 'name_desc') {
      sortOptions = { name: -1 };
    } else if (sort === 'popular') {
      sortOptions = { isPopular: -1, createdAt: -1 };
    }

    const products = await Product.find(query)
      .populate('category', 'name description image')
      .sort(sortOptions);

    res.json({
      success: true,
      message: 'Taomlar ro‘yxati muvaffaqiyatli olindi.',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single food product details by MongoDB ObjectId
 * @route   GET /api/products/:id
 * @access  Public
 * @param   {Object} req - Express request object (params: id)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name description image');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Taom topilmadi.',
      });
    }

    res.json({
      success: true,
      message: 'Taom ma’lumotlari olindi.',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new food product dish
 * @route   POST /api/products
 * @access  Private / Admin
 * @param   {Object} req - Express request object (body: name, description, price, image, category, isAvailable, isPopular)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, isAvailable, isPopular } = req.body;

    const trimmedName = name ? name.trim() : '';
    const trimmedDesc = description ? description.trim() : '';
    const trimmedImage = image ? image.trim() : '';

    if (!trimmedName || !trimmedDesc || price === undefined || price === null || !trimmedImage || !category) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, taomning barcha majburiy maydonlarini to‘ldiring.',
      });
    }

    const product = await Product.create({
      name: trimmedName,
      description: trimmedDesc,
      price: Number(price),
      image: trimmedImage,
      category,
      isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
      isPopular: isPopular !== undefined ? Boolean(isPopular) : false,
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name');

    res.status(201).json({
      success: true,
      message: 'Taom muvaffaqiyatli yaratildi.',
      data: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing food product dish details
 * @route   PUT /api/products/:id
 * @access  Private / Admin
 * @param   {Object} req - Express request object (params: id, body: name, description, price, image, category, isAvailable, isPopular)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, isAvailable, isPopular } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Taom topilmadi.',
      });
    }

    if (name && name.trim() !== '') product.name = name.trim();
    if (description && description.trim() !== '') product.description = description.trim();
    if (price !== undefined && price !== null) product.price = Number(price);
    if (image && image.trim() !== '') product.image = image.trim();
    if (category) product.category = category;
    if (isAvailable !== undefined) product.isAvailable = Boolean(isAvailable);
    if (isPopular !== undefined) product.isPopular = Boolean(isPopular);

    const updatedProduct = await product.save();
    const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name');

    res.json({
      success: true,
      message: 'Taom ma’lumotlari muvaffaqiyatli yangilandi.',
      data: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete food product dish by MongoDB ObjectId
 * @route   DELETE /api/products/:id
 * @access  Private / Admin
 * @param   {Object} req - Express request object (params: id)
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next middleware function
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Taom topilmadi.',
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Taom muvaffaqiyatli o‘chirildi.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
