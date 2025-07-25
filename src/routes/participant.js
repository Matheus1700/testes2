const express = require('express');
const router = express.Router();
const Participant = require('../models/participant');

router.get('/:email/events', async (req, res) => {
  try {
    const events = await Participant.find({ email: req.params.email, status: 'active' }).select('eventId -_id');
    if (!events.length) {
      return res.status(404).json({ message: 'Nenhum evento encontrado para este participante.' });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar eventos.' });
  }
});

module.exports = router;
