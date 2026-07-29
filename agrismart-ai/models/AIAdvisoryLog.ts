import mongoose from 'mongoose';

const AIAdvisoryLogSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  generatedAt: { type: Date, default: Date.now },
  models: {
    nextIrrigationDate: { type: Date },
    durationHours: { type: Number },
    cropWaterRequirementLiters: { type: Number },
    waterStressIndex: { type: Number },
    predictedYieldLossPercentage: { type: Number },
    diseaseForecasterRisk: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'] },
    expectedHarvestTonnageRange: {
      min: { type: Number },
      max: { type: Number }
    }
  },
  fertigation: {
    nutrients: [{
      name: { type: String },
      amountKg: { type: Number }
    }],
    notes: { type: String }
  },
  electricityWindow: {
    start: { type: String }, // e.g. "05:00"
    end: { type: String }
  },
  llmAdvisories: {
    en: { type: String },
    kn: { type: String },
    mr: { type: String },
    hi: { type: String }
  },
  override: {
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'ADJUSTED'], default: 'PENDING' },
    adjustedDurationHours: { type: Number },
    reason: { type: String },
    updatedBy: { type: String }, // User clerk ID / User ID
    updatedAt: { type: Date }
  }
});

AIAdvisoryLogSchema.index({ farmId: 1, generatedAt: -1 });

export default mongoose.models.AIAdvisoryLog || mongoose.model('AIAdvisoryLog', AIAdvisoryLogSchema);
