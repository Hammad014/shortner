// models/UserGeneratedLinks.js
import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true }, // short code
  fullShortUrl: { type: String, required: true }, // full short URL
  clicks: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
  date: { type: Date, default: Date.now },
});

const userGeneratedLinksSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  links: [linkSchema],  // array of links
});

const UserGeneratedLinks = mongoose.models.UserGeneratedLinks || mongoose.model('UserGeneratedLinks', userGeneratedLinksSchema);

export default UserGeneratedLinks;
