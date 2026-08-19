import Chef from '../models/Chef.js';

export const getChefs = async (req, res, next) => {
  try {
    const chefs = await Chef.find({}).sort({ createdAt: 1 });
    res.json({ success: true, message: 'Chefs retrieved successfully', data: chefs });
  } catch (error) {
    next(error);
  }
};

export const getChefById = async (req, res, next) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
      return res.status(404).json({ success: false, message: 'Chef not found' });
    }
    res.json({ success: true, message: 'Chef details retrieved', data: chef });
  } catch (error) {
    next(error);
  }
};

export const createChef = async (req, res, next) => {
  try {
    const chef = await Chef.create(req.body);
    res.status(201).json({ success: true, message: 'Chef added', data: chef });
  } catch (error) {
    next(error);
  }
};

export const updateChef = async (req, res, next) => {
  try {
    const chef = await Chef.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chef) return res.status(404).json({ success: false, message: 'Chef not found' });
    res.json({ success: true, message: 'Chef updated', data: chef });
  } catch (error) {
    next(error);
  }
};

export const deleteChef = async (req, res, next) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);
    if (!chef) return res.status(404).json({ success: false, message: 'Chef not found' });
    res.json({ success: true, message: 'Chef deleted', data: {} });
  } catch (error) {
    next(error);
  }
};
