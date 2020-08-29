require('dotenv').config();
require('./db'); // will run the code in `./db/index.js` (which is the database connection logic)
require('./passport');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const http = require('http').Server(app);
const socket = require('socket.io');
require('./session')(app);

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
// Allow cross-origin

app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: true })); // sets the `body` object in the `request` with the values from an HTML POST form

app.use(express.json()); // sets the `body` object in the `request` with the data coming from a request with a `body` (request we'll issue with axios, fetch...)

app.use(logger('dev')); // this middleware will log every response that is issued (with the status code) in the console
app.use(express.static('client/build')); // makes the client/build folder static

const routes = require('./routes'); // this is our controller and will manage all the routes so we don't have to register any new route handler here
app.use(routes);

server.listen(process.env.PORT, () => {
  console.log(`Express server listening to: ${process.env.PORT}`);
});

const io = socket(server);
// io.set('origins', 'http://localhost:3000/');
// app.listen(process.env.PORT, () => {
//   console.log(`Express server listening to: ${process.env.PORT}`);
// });

io.on('connection', function (socket) {
  console.log('Made Socket Connection');
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });
});
