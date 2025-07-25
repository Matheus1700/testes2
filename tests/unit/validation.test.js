const { validateParticipant } = require('../../src/controllers/validation');

describe('Participant Validation', () => {
  it('should return an error for missing name', () => {
    const participant = { email: 'john.doe@example.com', eventId: '123' };
    const error = validateParticipant(participant);
    expect(error).toBe('Todos os campos são obrigatórios.');
  });

  it('should return an error for missing email', () => {
    const participant = { name: 'John Doe', eventId: '123' };
    const error = validateParticipant(participant);
    expect(error).toBe('Todos os campos são obrigatórios.');
  });

  it('should return an error for invalid email', () => {
    const participant = { name: 'John Doe', email: 'john.doe', eventId: '123' };
    const error = validateParticipant(participant);
    expect(error).toBe('Email inválido.');
  });

  it('should return null for valid data', () => {
    const participant = { name: 'John Doe', email: 'john.doe@example.com', eventId: '123' };
    const error = validateParticipant(participant);
    expect(error).toBeNull();
  });
});
