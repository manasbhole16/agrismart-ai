import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkUserId: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, enum: ['Farmer', 'Agronomist', 'Administrator'], default: 'Farmer' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
