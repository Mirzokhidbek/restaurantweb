/**
 * FAZO Restorani Namangan - Backend Express Server
 * 
 * Clean Architecture Overview:
 * - Express.js REST API Architecture
 * - MongoDB Connection via Mongoose ORM
 * - Standardized API Response Schema: { success: boolean, message: string, data: any }
 * - Modular Route Controllers & Middleware
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route Handlers
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import chefRoutes from './routes/chefRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';

// Initialize Environment Variables
dotenv.config();

// Connect Database (MongoDB Atlas / Local Fallback)
connectDB();

const app = express();

// Global Middleware Configuration
app.use(cors());
app.use(express.json());

// API Liveness Probe / Status Endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'FAZO Restorani API service operational',
    timestamp: new Date(),
  });
});

// REST API Route Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Global Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`FAZO Restorani Backend Server operational on port ${PORT}`);
});
