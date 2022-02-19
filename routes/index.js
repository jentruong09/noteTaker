const express = require('express');

const apiRouter = require('./notes');

const app = express();

app.use('/notes', apiRouter)

module.exports = app