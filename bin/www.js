#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv/config');
const http = require('http');
const app = require('../src/app');

/**
 * Get port from environment and store in Express.
 */
const port = 3000;
app.set('port', process.env.PORT || port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  console.log(`library management server listening on port ${port}`);
};

/**
* Event listener for HTTP server "error" event.
*/

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
* Listen on provided port, on all network interfaces.
*/

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
