import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    docketNumber: { type: Number, unique: true },
    paperName: String,
    type: String,
    caliper: String,
    size: String,
    count: { type: Number, default: 0 },
    savedAt: String, // human-readable string
  },
  { timestamps: true }
);

// create model based on schema

const Item = mongoose.model('item', itemSchema);

export default Item;
