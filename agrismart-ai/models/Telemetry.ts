import mongoose from 'mongoose';

const TelemetrySchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  timestamp: { type: Date, default: Date.now },
  soilMoisture30cm: { type: Number },
  soilMoisture60cm: { type: Number },
  soilTemperature: { type: Number },
  ambientTemperature: { type: Number },
  relativeHumidity: { type: Number },
  rainfallGauge: { type: Number }, // local localized rainfall in mm
  batteryLevel: { type: Number }
});

TelemetrySchema.index({ farmId: 1, timestamp: -1 });

export default mongoose.models.Telemetry || mongoose.model('Telemetry', TelemetrySchema);
