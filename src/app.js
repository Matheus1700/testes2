const express = require('express');
const connectDB = require('./database');
const registerRoute = require('./routes/register');
const checkinRoute = require('./routes/checkin');
const participantRoute = require('./routes/participant');
require('dotenv').config();

const app = express();

app.use(express.json());

connectDB();

app.use('/register', registerRoute);
app.use('/checkin', checkinRoute);
app.use('/participants', participantRoute);

module.exports = app;
