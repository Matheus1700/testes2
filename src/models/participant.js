const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  eventId: { type: String, required: true },
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
}, { timestamps: true });

participantSchema.index({ email: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Participant', participantSchema);
