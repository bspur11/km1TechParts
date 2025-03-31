import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  id: Number,
  docket: Number,
  paperName: String,
  caliper: String,
  size: String,
});

// create model based on schema

const Item = mongoose.model('item', itemSchema);

export default Item;
