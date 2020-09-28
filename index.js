
require('dotenv').config();
JWT_SECRET="don't tell a soul"

const express = require('express');
const server = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const jwt = require('jsonwebtoken');
const { client } = require('./db');
client.connect();
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use('/api', apiRouter);

apiRouter.use((error, req, res, next) => {
  console.error(error);
  res.send(error);
});

apiRouter.use('*', (req, res, next) => {
  res.status(404).send('Oops! Page cannot be reached :(');
});

const { PORT = 3000 } = process.env;
server.listen(PORT, function() {
  console.log(`The server is up on port http://localhost:${PORT}`)
})
