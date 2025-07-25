const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({
  participantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
  eventId: { type: String, required: true },
  checkinDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Checkin', checkinSchema);
