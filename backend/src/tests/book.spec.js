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
      console.log('BOOKS_API',BOOKS_API);
      const res = await mockRequest(app).get(BOOKS_API+'/');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });

    it('should return empty list if the books are not available', async () => {
      await Book.deleteMany({});
      const res = await mockRequest(app).get(BOOKS_API+'/');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(0);
    });

    it('should return book based on isbn', async () => {
      const isbn = 'ISBN001';
      const res = await mockRequest(app).get(BOOKS_API+'/'+isbn);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.any.keys('title', 'isbn', 'available_copies');
    });

    it('should return 404 error if the given isbn of book is not available', async () => {
      const isbn = 'ISBN0011111';
      const res = await mockRequest(app).get(BOOKS_API +'/'+ isbn);
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("should return book when the all request body is valid", async () => {
      const res = await mockRequest(app)
        .post(BOOKS_API+'/')
        .send({
          isbn: 'ISBN001', title: 'Book1', available_copies: 1,
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isbn");
      expect(res.body).to.have.property("title", "Book1");
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe("PUT /:id", () => {
    it("should update the existing order and return 200", async () => {
      const book = new Book({
        isbn: 'ISBN001', title: 'Book1', available_copies: 1,
      });
      await book.save();

      const res = await mockRequest(app)
        .put(BOOKS_API+'/' + book.isbn)
        .send({
          isbn: 'ISBN00123', title: 'Book1', available_copies: 1,
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isbn", "ISBN00123");
    });
  });

  describe("DELETE /:id", () => {
    it("should delete requested id and return response 200", async () => {
      const book = new Book({
        isbn: 'ISBN001', title: 'Book1', available_copies: 1,
      });
      await book.save();

      const res = await mockRequest(app).delete(BOOKS_API+'/' + book.isbn);
      expect(res.status).to.be.equal(200);
    });

    it("should return 404 when deleted book is requested", async () => {
      const book = new Book({
        isbn: 'ISBN0011', title: 'Book1', available_copies: 1,
      });
      await book.save();

      let res = await mockRequest(app).delete(BOOKS_API+'/'+ book.isbn);
      expect(res.status).to.be.equal(200);

      res = await mockRequest(app).get(BOOKS_API+'/'+ book.isbn);
      expect(res.status).to.be.equal(404);
    });
  });
});
