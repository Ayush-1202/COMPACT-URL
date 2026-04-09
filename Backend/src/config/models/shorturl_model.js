import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
    index: true
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  clicks: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;