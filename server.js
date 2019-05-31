const express = require('express');

const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


server.use('/api/users', userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] A ${req.method} request to '$${req.url}'`);
  next()
};

server.use(logger);

module.exports = server;
