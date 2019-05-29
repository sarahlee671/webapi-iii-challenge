const express = require('express');

const router = require('./posts/postRouter');

const server = express();

server.use(express.json());

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/api/posts', router);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] A ${req.method} request to '$${req.url}'`);
  next()

};

module.exports = server;
