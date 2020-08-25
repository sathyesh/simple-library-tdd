// const mongoose = require('mongoose');
const { Book } = require('../models/book.model');

module.exports.getAllBooks = async (req, res) => {
  const books = await Book.find({});
  return res.send(books);
};

module.exports.createBook = async (req, res) => {
  const book = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    available_copies: req.body.available_copies,
  });
  await book.save();
  return res.send(book);
};

module.exports.getBook = async (req, res) => {
  const { isbn } = req.params;
  const book = await Book.findOne({
    isbn,
  });
  if (book === null) {
    return res.status(404).send('Book not found');
  }
  return res.status(200).send(book);
};

module.exports.updateBook = async (req, res) => {
  const { isbn } = req.params;
  Book.findOneAndUpdate(isbn, req.body, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
};

module.exports.deleteBook = async (req, res) => {
  await Book.findOneAndRemove({ isbn: req.params.isbn });
  return res.send('Book deleted');
};
