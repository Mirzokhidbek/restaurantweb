import Setting from '../models/Setting.js';

// @desc    Get restaurant settings (status open/closed)
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ isRestaurantOpen: true });
    }
    res.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle or update restaurant settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res, next) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting();
    }

    if (req.body.isRestaurantOpen !== undefined) {
      setting.isRestaurantOpen = req.body.isRestaurantOpen;
    }
    if (req.body.closingMessage !== undefined) {
      setting.closingMessage = req.body.closingMessage;
    }

    await setting.save();

    res.json({
      success: true,
      message: setting.isRestaurantOpen
        ? 'Restoran faoliyati MUVAFFAQIYATLI OCHILDI! 🟢'
        : 'Restoran faoliyati VAQTINCHA YOPILDI! 🔴',
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};
