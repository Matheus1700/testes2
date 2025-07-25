const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Participant = require('../../src/models/participant');
const Checkin = require('../../src/models/checkin');

describe('POST /checkin', () => {
  let participant;

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
    await Checkin.deleteMany({});
    participant = await Participant.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      eventId: '60c72b2f9b1d8c001f8e4c6a',
    });
  });

  it('should allow a participant to check-in', async () => {
    const response = await request(app)
      .post('/checkin')
      .send({
        participantId: participant._id,
        eventId: '60c72b2f9b1d8c001f8e4c6a',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Check-in realizado com sucesso!');
  });

  it('should not allow a participant to check-in with an invalid participant ID', async () => {
    const response = await request(app)
      .post('/checkin')
      .send({
        participantId: '60c72b2f9b1d8c001f8e4c6b',
        eventId: '60c72b2f9b1d8c001f8e4c6a',
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Participante não encontrado.');
  });

  it('should not allow a participant to check-in to an event they are not registered for', async () => {
    const response = await request(app)
      .post('/checkin')
      .send({
        participantId: participant._id,
        eventId: '60c72b2f9b1d8c001f8e4c6b',
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Participante não inscrito neste evento.');
  });
});
