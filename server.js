'use strict';
const express = require('express');
const app = express();
const chatCat = require('./app');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
// app.set('views', './views'); // views = ./views
app.set('view engine', 'ejs');

app.use(chatCat.sessions);
app.use('/', chatCat.router);

app.listen(app.get('port'), () => {
  console.log('CHATCAT is running on Port: ', app.get('port'));
});
