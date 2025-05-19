const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema(
  {
    confidence: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    location: { type: String, default: 'Camera 1' },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// ✅ Fix: Prevent model overwrite during hot-reloading in dev
module.exports = mongoose.models.Detection || mongoose.model('catdect', detectionSchema);
