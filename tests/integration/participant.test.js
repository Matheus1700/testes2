const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Participant = require('../../src/models/participant');

describe('GET /participants/:email/events', () => {
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
    participant = await Participant.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      eventId: '60c72b2f9b1d8c001f8e4c6a',
    });
    await Participant.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      eventId: '60c72b2f9b1d8c001f8e4c6b',
    });
  });

  it('should list all events for a participant', async () => {
    const response = await request(app)
      .get(`/participants/${participant.email}/events`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(2);
    expect(response.body[0].eventId).toBe('60c72b2f9b1d8c001f8e4c6a');
  });
});
