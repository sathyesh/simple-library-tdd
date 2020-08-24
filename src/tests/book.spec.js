const mockRequest = require('supertest');
const { expect } = require('chai');
const { Book } = require('../models/book.model');
const app = require('../app');
const { BOOKS_API } = require('../models/constants');

describe('api/books', () => {
  // Test setup
  beforeEach(async () => {
    await Book.deleteMany({});
    const tempBooks = [{
      isbn: 'ISBN001', title: 'Book1', available_copies: 1,
    },
    {
      isbn: 'ISBN002', title: 'Book2', available_copies: 4,
    },
    ];
    await Book.insertMany(tempBooks);
  });

  describe('Get /', () => {
    it('should return books list', async () => {
      const res = await mockRequest(app).get(BOOKS_API);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });

    it('should return empty list if the books are not available', async () => {
      await Book.deleteMany({});
      const res = await mockRequest(app).get(BOOKS_API);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(0);
    });

    it('should return book based on isbn', async () => {
      const isbn = 'ISBN001';
      const res = await mockRequest(app).get(BOOKS_API + isbn);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.any.keys('title', 'isbn', 'available_copies');
    });

    it('should return 404 error if the given isbn of book is not available', async () => {
      const isbn = 'ISBN0011111';
      const res = await mockRequest(app).get(BOOKS_API + isbn);
      expect(res.status).to.equal(404);
    });
  });
});
