import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  dateRecieved: Number,
  stockQuantity: Number,
});

// create model based on schema

const Item = mongoose.model('item', itemSchema);

export default Item;
