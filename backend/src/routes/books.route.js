const express = require('express');

const router = express.Router();
const controller = require('../controllers/books.controller');

router
  .route('/')
  .get(controller.getAllBooks)
  .post(controller.createBook);
router
  .route('/:isbn')
  .get(controller.getBook)
  .put(controller.updateBook)
  .delete(controller.deleteBook);

module.exports = router;
