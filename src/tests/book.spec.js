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
    it('should return all books', async () => {
      const res = await mockRequest(app).get(BOOKS_API);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });
});
