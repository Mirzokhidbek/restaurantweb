import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User.js';

dotenv.config();

let mongoMemoryServer = null;

/**
 * Guarantees default Admin user (admin@restaurant.com / admin123) exists in active DB
 */
const seedDefaultAdmin = async () => {
  try {
    const adminEmail = 'admin@restaurant.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: 'FAZO Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
        phone: '+998 77 301 00 05',
      });
      console.log('✅ Default Admin User seeded: admin@restaurant.com / admin123');
    }
  } catch (err) {
    console.error('Failed to seed default admin user:', err.message);
  }
};

/**
 * Connects to MongoDB Atlas or falls back gracefully to In-Memory MongoDB so Express server never crashes
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  mongoose.set('strictQuery', false);

  if (mongoUri) {
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 4000,
      });
      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
      await seedDefaultAdmin();
      return;
    } catch (err) {
      console.warn(`⚠️ Primary MongoDB Atlas connection timed out (${err.message}).`);
      console.warn('⚡ Starting In-Memory MongoDB Fallback server so Express backend stays operational on Port 5001...');
    }
  }

  try {
    mongoMemoryServer = await MongoMemoryServer.create();
    const memoryUri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(memoryUri);
    console.log(`✅ In-Memory MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultAdmin();
  } catch (error) {
    console.error(`❌ Error initializing database connection: ${error.message}`);
  }
};

export default connectDB;
