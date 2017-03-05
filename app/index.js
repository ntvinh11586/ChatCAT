'use strict';

const config = require('./config');
const redis = require('redis').createClient;
const adapter = require('socket.io-redis');
// Social Authentication Logic
require('./auth')();

// Create an IO Server instance
let ioServer = app => {
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);

  // Using Redis
  io.set('transports', ['websocket']);
	let pubClient = redis(config.redis.port, config.redis.host, {
		auth_pass: config.redis.password
	});
	let subClient = redis(config.redis.port, config.redis.host, {
		return_buffers: true,
		auth_pass: config.redis.password
	});
	io.adapter(adapter({
		pubClient,
		subClient
	}));

  // 062 Socket.io - Bridging Socket.io with Session
  io.use((socket, next) => {
    require('./session')(socket.request, {}, next);
  });
  require('./socket')(io, app);
  return server;
}

module.exports = {
  router: require('./routes')(),
  sessions: require('./session'),
  ioServer,
  logger: require('./logger')
}
