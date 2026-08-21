import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res, next) => {
  try {
    const { customerName, phone, notes, items } = req.body;
    const address = req.body.address || req.body.shippingAddress?.street || req.body.street;

    if (!customerName || !phone || !address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, mijoz ma’lumotlarini va kamida bitta taomni tanlang.',
      });
    }

    let calculatedTotal = 0;
    const processedItems = [];

    for (const item of items) {
      const targetProductId = item.productId || item.product || item._id;
      const product = await Product.findById(targetProductId);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Taom topilmadi: ${item.name || targetProductId}`,
        });
      }
      if (!product.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `'${product.name}' taomi hozirda sotuvda mavjud emas.`,
        });
      }

      const qty = Number(item.quantity) || 1;
      const subtotal = product.price * qty;
      calculatedTotal += subtotal;

      processedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
        subtotal: subtotal,
      });
    }

    // Add standard delivery fee if applicable
    const deliveryFee = calculatedTotal >= 150000 ? 0 : 15000;
    const finalTotal = calculatedTotal + deliveryFee;

    const order = await Order.create({
      customerName,
      phone,
      address,
      notes: notes || '',
      items: processedItems,
      totalPrice: finalTotal,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Buyurtmangiz muvaffaqiyatli rasmiylashtirildi!',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: 'Buyurtmalar ro‘yxati olindi.',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Buyurtma topilmadi.',
      });
    }

    res.json({
      success: true,
      message: 'Buyurtma ma’lumotlari olindi.',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Noto‘g‘ri holat kiritildi. Ruxsat etilgan holatlar: ${allowedStatuses.join(', ')}`,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Buyurtma topilmadi.',
      });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Buyurtma holati muvaffaqiyatli yangilandi.',
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Buyurtma topilmadi.',
      });
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: 'Buyurtma muvaffaqiyatli o‘chirildi.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard basic sales statistics
// @route   GET /api/orders/stats/dashboard
// @access  Private/Admin
export const getStats = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    
    const totalOrders = orders.length;
    
    // Today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysOrders = orders.filter(
      (o) => new Date(o.createdAt) >= today
    ).length;

    // Revenue calculation (excluding cancelled)
    const totalRevenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.totalPrice, 0);

    const pendingOrders = orders.filter((o) => o.status === 'pending').length;

    // Unique customers count by phone or name
    const uniquePhones = new Set(orders.map((o) => o.phone));
    const totalCustomers = uniquePhones.size;

    res.json({
      success: true,
      message: 'Boshqaruv paneli statistikasi hisoblandi.',
      data: {
        totalOrders,
        todaysOrders,
        totalRevenue,
        pendingOrders,
        totalCustomers,
      },
    });
  } catch (error) {
    next(error);
  }
};
