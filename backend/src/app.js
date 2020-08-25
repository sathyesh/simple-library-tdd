/**
 * Express server is initialized
 * MongoDB connection is established
 * REST APIs are added to the server
 */

require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect('mongodb://localhost/LibraryDB', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB at mongodb://localhost/LibraryDB...'))
  .catch((err) => {
    console.log('Failed to connect to MongoDB...', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.send({ message: 'Library REST API Server is running'});
});

// REST API for Users and Books
const usersRouter = require('./routes/users.route');
const booksRouter = require('./routes/books.route');
const { USERS_API, BOOKS_API } = require('./models/constants');

app.use(USERS_API, usersRouter);
app.use(BOOKS_API, booksRouter);

// Common 404 error for API Request

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
