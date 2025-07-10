import mongoose from 'mongoose';

const maintenanceLogSchema = new mongoose.Schema(
  {
    machine: String,
    electrical: String,
    mechanical: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('maintenanceLog', maintenanceLogSchema);
