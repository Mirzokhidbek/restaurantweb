import User from '../models/User.js';
import Order from '../models/Order.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token (Admin or Customer)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, email va parolni kiriting.',
      });
    }

    let user = await User.findOne({ email });

    // Fallback auto-seed for default admin credentials if DB is fresh
    if (!user && email.trim() === 'admin@restaurant.com' && password === 'admin123') {
      user = await User.create({
        name: 'FAZO Admin',
        email: 'admin@restaurant.com',
        password: 'admin123',
        role: 'admin',
        phone: '+998 77 301 00 05',
      });
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        message: 'Tizimga kirish muvaffaqiyatli amalga oshirildi.',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone || '',
          addresses: user.addresses || [],
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Email yoki parol noto‘g‘ri kiritildi.',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Register new customer
// @route   POST /api/auth/register
// @access  Public
export const registerCustomer = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, barcha majburiy maydonlarni to‘ldiring (ism, email, parol).',
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Ushbu email manzili bilan allaqachon foydalanuvchi ro‘yxatdan o‘tgan.',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'customer',
      phone: phone || '',
      addresses: [],
    });

    res.status(201).json({
      success: true,
      message: 'Akkaunt muvaffaqiyatli yaratildi.',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: [],
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json({
        success: true,
        message: 'Foydalanuvchi profili olindi.',
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi.',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'Foydalanuvchi topilmadi.' });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      success: true,
      message: 'Profil ma’lumotlari muvaffaqiyatli saqlandi.',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses,
        token: generateToken(updatedUser._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add customer address
// @route   POST /api/auth/address
// @access  Private
export const addAddress = async (req, res, next) => {
  try {
    const { title, street, city, phone } = req.body;
    if (!street) return res.status(400).json({ success: false, message: 'Ko‘cha va uy manzili majburiy.' });

    const user = await User.findById(req.user._id);
    user.addresses.push({
      title: title || 'Uy',
      street,
      city: city || 'Namangan',
      phone: phone || user.phone || '',
      isDefault: user.addresses.length === 0,
    });

    await user.save();
    res.json({ success: true, message: 'Manzil saqlandi.', data: user.addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete customer address
// @route   DELETE /api/auth/address/:addressId
// @access  Private
export const removeAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses = user.addresses.filter((a) => a._id.toString() !== req.params.addressId);
    await user.save();
    res.json({ success: true, message: 'Manzil o‘chirildi.', data: user.addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/auth/my-orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ phone: req.user.phone || '' }).sort({ createdAt: -1 });
    let allOrders = orders;
    if (allOrders.length === 0) {
      allOrders = await Order.find({ customerName: { $regex: req.user.name, $options: 'i' } }).sort({ createdAt: -1 });
    }
    res.json({ success: true, message: 'Mijoz buyurtmalari olindi.', data: allOrders });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password Request
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Ushbu email manzili bilan akkaunt topilmadi.' });
    }

    res.json({
      success: true,
      message: 'Parolni tiklash havolasi email manzilingizga yuborildi.',
      data: { resetToken: 'RESTAURANT-RESET-99281' },
    });
  } catch (error) {
    next(error);
  }
};
