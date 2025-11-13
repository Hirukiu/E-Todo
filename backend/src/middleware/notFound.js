const express = require('express');
const notFound = express.Router();

notFound.all('*', (req, res) => {
  res.status(404).send('404 - Page not found');
});

module.exports = notFound;