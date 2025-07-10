import mongoose from 'mongoose';

const inkItemSchema = new mongoose.Schema(
  {
    color: String,
    type: String,
    quantity: Number,
    receivedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('InkItem', inkItemSchema);
