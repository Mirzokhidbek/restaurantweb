import Bookmark from '../models/Bookmark.js';

export const getBookmarks = async (req, res, next) => {
  try {
    let bookmark = await Bookmark.findOne({ userId: req.user._id }).populate('products');
    if (!bookmark) {
      bookmark = await Bookmark.create({ userId: req.user._id, products: [] });
    }
    res.json({ success: true, message: 'Bookmarks fetched', data: bookmark.products });
  } catch (error) {
    next(error);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let bookmark = await Bookmark.findOne({ userId: req.user._id });
    if (!bookmark) {
      bookmark = await Bookmark.create({ userId: req.user._id, products: [] });
    }

    const index = bookmark.products.indexOf(productId);
    let isBookmarked = false;
    if (index > -1) {
      bookmark.products.splice(index, 1);
    } else {
      bookmark.products.push(productId);
      isBookmarked = true;
    }

    await bookmark.save();
    const updated = await Bookmark.findOne({ userId: req.user._id }).populate('products');
    res.json({
      success: true,
      message: isBookmarked ? 'Added to Bookmarks' : 'Removed from Bookmarks',
      data: updated.products,
    });
  } catch (error) {
    next(error);
  }
};
