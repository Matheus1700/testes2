const express = require('express');
const router = express.Router();
const Participant = require('../models/participant');
const Checkin = require('../models/checkin');

router.post('/', async (req, res) => {
  const { participantId, eventId } = req.body;

  try {
    const participant = await Participant.findById(participantId);

    if (!participant) {
      return res.status(404).json({ message: 'Participante não encontrado.' });
    }

    if (participant.eventId !== eventId) {
      return res.status(400).json({ message: 'Participante não inscrito neste evento.' });
    }

    const checkin = new Checkin({ participantId, eventId });
    await checkin.save();
    res.status(201).json({ message: 'Check-in realizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar check-in.' });
  }
});

module.exports = router;
