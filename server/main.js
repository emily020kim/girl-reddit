require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/client');
const apiRouter = require('./api');
const helmet = require('helmet');
const cors = require('cors');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// API routes
app.use('/api', apiRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

module.exports = app;
