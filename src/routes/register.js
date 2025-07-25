const express = require('express');
const router = express.Router();
const Participant = require('../models/participant');
const { validateParticipant } = require('../controllers/validation');

router.post('/', validateParticipant, async (req, res) => {
  const { name, email, eventId } = req.body;

  try {
    const participant = new Participant({ name, email, eventId });
    await participant.save();
    res.status(201).json({ message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar inscrição.' });
  }
});

router.delete('/:participantId', async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(
      req.params.participantId,
      { status: 'cancelled' },
      { new: true }
    );
    if (!participant) {
      return res.status(404).json({ message: 'Participante não encontrado.' });
    }
    res.status(200).json({ message: 'Inscrição cancelada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar inscrição.' });
  }
});

module.exports = router;
