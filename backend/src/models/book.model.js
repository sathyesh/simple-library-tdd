const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  available_copies: {
    type: Number,
    required: false,
    default: 1,
  },
});

module.exports.Book = mongoose.model('book', bookSchema);
