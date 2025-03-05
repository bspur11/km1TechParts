import express from 'express';
import mongoose from 'mongoose';

// Create an Express App
const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/models/items.js', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware, Routes, etc.
app.get('/', (req, res) => {
  res.send('HHello World');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
