import mongoose from 'mongoose';

const WeatherSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' }, // optional, could be general by district
  date: { type: Date, required: true },
  temperature: { type: Number },
  humidity: { type: Number },
  rainfall: { type: Number },
  windSpeed: { type: Number },
  uvIndex: { type: Number },
  forecast: { type: Array },
});

export default mongoose.models.Weather || mongoose.model('Weather', WeatherSchema);
