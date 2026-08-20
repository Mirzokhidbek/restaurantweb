import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Chef from '../models/Chef.js';
import Testimonial from '../models/Testimonial.js';
import FAQ from '../models/FAQ.js';
import Bookmark from '../models/Bookmark.js';

dotenv.config();

const clearDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing all products, categories, orders, chefs, testimonials, FAQs, and bookmarks...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Chef.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});
    await Bookmark.deleteMany({});
    await User.deleteMany({});

    console.log('Creating clean Admin user account for manual management via /admin...');
    const adminUser = new User({
      name: 'FAZO Restorani Menejeri',
      email: 'admin@restaurant.com',
      password: 'admin123',
      role: 'admin',
      phone: '+998 77 301 00 05',
    });
    await adminUser.save();

    console.log('Database cleared successfully! Only default Admin user exists.');
    console.log('Admin Email: admin@restaurant.com');
    console.log('Admin Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error(`Error clearing database: ${error.message}`);
    process.exit(1);
  }
};

clearDatabase();
