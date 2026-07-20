import mongoose from 'mongoose';

const RecommendationSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  type: { type: String, enum: ['Irrigation', 'Fertigation', 'Health'], required: true },
  date: { type: Date, default: Date.now },
  details: { type: Object },
  confidenceScore: { type: Number },
  reason: { type: String },
});

export default mongoose.models.Recommendation || mongoose.model('Recommendation', RecommendationSchema);
