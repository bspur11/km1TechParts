import express from 'express';
import mongoose from 'mongoose';
import Item from './models/items.js';

// Create an Express App
const app = express();
app.use(express.json()); //middleware to parse Json

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/items', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware, Routes, etc.
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      dateRecieved: req.body.dateRecieved,
      stockQuantity: req.body.stockQuantity,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: 'Error adding item' });
  }
});
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { id: req.params.id }, //find by custom id instead of MongoId
      {
        name: req.body.name,
        description: req.body.description,
        dateRecieved: req.body.dateRecieved,
        stockQuantity: req.body.stockQuantity,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json(error, 'Item not found!');
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Error updating item!' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const deleteItem = await Item.findOneAndDelete({ id: req.params.id });

    if (!deleteItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting Item!' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
