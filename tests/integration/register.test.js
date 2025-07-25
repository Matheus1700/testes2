const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Participant = require('../../src/models/participant');

describe('Registration', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Participant.deleteMany({});
  });

  describe('POST /register', () => {
    it('should register a participant with valid data', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john.doe@example.com',
          eventId: '60c72b2f9b1d8c001f8e4c6a',
        });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Inscrição realizada com sucesso!');
    });

    it('should not register a participant with an invalid email', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john.doe',
          eventId: '60c72b2f9b1d8c001f8e4c6a',
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email inválido.');
    });

    it('should not register a participant with missing fields', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          name: 'John Doe',
          email: 'john.doe@example.com',
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Todos os campos são obrigatórios.');
    });
  });

  describe('DELETE /register/:participantId', () => {
    it('should cancel a registration', async () => {
      const participant = await Participant.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        eventId: '60c72b2f9b1d8c001f8e4c6a',
      });

      const response = await request(app)
        .delete(`/register/${participant._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Inscrição cancelada com sucesso!');

      const cancelledParticipant = await Participant.findById(participant._id);
      expect(cancelledParticipant.status).toBe('cancelled');
    });
  });
});
