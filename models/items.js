import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    id: Number,
    docket: Number,
    paperName: String,
    type: String,
    caliper: String,
    size: String,
    count: Number,
    savedAt: String, // human-readable string
  },
  { timestamps: true }
);

// create model based on schema

const Item = mongoose.model('item', itemSchema);

export default Item;
