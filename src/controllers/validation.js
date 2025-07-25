const { body, validationResult } = require('express-validator');

const validateParticipant = [
  body('name').notEmpty().withMessage('O nome é obrigatório.'),
  body('email').isEmail().withMessage('O email é inválido.'),
  body('eventId').notEmpty().withMessage('O ID do evento é obrigatório.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateParticipant };
