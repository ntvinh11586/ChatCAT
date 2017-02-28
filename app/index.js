'use strict';
const router = require('express').Router();

module.exports = {
  router: require('./routes')(),
  sessions: require('./session')
}
