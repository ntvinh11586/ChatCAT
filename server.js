'use strict';
const express = require('express');
const app = express();
const chatCat = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
// app.set('views', './views'); // views = ./views
app.set('view engine', 'ejs');

// set sessions
app.use(chatCat.sessions);

// use passport for auth
app.use(passport.initialize());
app.use(passport.session());

// Use for logging HTTP request
app.use(require('morgan')('combined', {
  stream: {
    write: message => {
      // writes to logs
      chatCat.logger.log('info', message);
    }
  }
}));

// mount point
app.use('/', chatCat.router);

chatCat.ioServer(app).listen(app.get('port'), () => {
  console.log('CHATCAT is running on Port:', app.get('port'));
});
