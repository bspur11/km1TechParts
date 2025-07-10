import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import itemRoutes from './routes/itemRoutes.js';
import inkRoutes from './routes/inkRoutes.js';
import dotenv from 'dotenv';

// Create an Express App
const app = express();

app.use(express.json()); //middleware to parse Json

app.use(
  cors({
    origin: 'http://localhost:8080', // Allow only Webpack frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow CRUD operations
    allowedHeaders: ['Content-Type'], // Allow JSON data
  })
);

app.use('/items', itemRoutes);
app.use('/api/inks', inkRoutes);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/items')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware, Routes, etc.

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
