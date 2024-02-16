import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
  date: { type: Date, default: Date.now },
});

const LinkModel = mongoose.model('Link', linkSchema);

export default LinkModel;
