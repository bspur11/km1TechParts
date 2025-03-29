import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: Number,
  docket: Number,
  name: String,
  description: String,
  dateReceived: Number,
  stockQuantity: Number,
});

// create model based on schema

const Item = mongoose.model('item', itemSchema);

export default Item;
