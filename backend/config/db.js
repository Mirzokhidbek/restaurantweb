import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myresto';
    mongoose.set('strictQuery', false);
    
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 4000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.log(`Local MongoDB 127.0.0.1 connection fallback (${err.message}). Starting MongoMemoryServer...`);
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
