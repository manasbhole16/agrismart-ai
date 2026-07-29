import mongoose from 'mongoose';

const FarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  farmerName: { type: String, required: true },
  village: { type: String },
  district: { type: String },
  state: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  boundary: {
    type: { type: String, enum: ['Polygon'], default: 'Polygon' },
    coordinates: { type: [[[Number]]], required: true }
  },
  areaAcres: { type: Number },
  sugarcaneVariety: { type: String },
  soilType: { type: String },
  waterSource: { type: String },
  plantingDate: { type: Date },
  cropAgeDays: { type: Number },
  irrigationMethod: { type: String },
  pumpStatus: { type: String, enum: ['ON', 'OFF', 'UNKNOWN'], default: 'OFF' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Farm || mongoose.model('Farm', FarmSchema);
