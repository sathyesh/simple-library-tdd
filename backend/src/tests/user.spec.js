/* eslint-disable no-underscore-dangle */
const mockRequest = require('supertest');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');
const app = require('../app');
const { USERS_API } = require('../models/constants');

const generatePasswordHash = (pwd) => bcrypt.hashSync(pwd, 10);
// const comparePassword = (pwd, hash) => bcrypt.compareSync(pwd, hash); // true

describe('/api/users/', () => {
  // Test setup
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('Get /', () => {
    it('should return all users', async () => {
      const tempUsers = [{
        name: 'test', email: 'test@gmail.com', password: generatePasswordHash('test'), books_borrowed: [],
      },
      {
        name: 'test1', email: 'test1@gmail.com', password: generatePasswordHash('test1'), books_borrowed: [],
      },
      ];
      await User.insertMany(tempUsers);
      const res = await mockRequest(app).get(USERS_API+'/');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });
  describe('GET/:id', () => {
    it('should return a user if valid id is passed', async () => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
        password: generatePasswordHash('test'),
        books_borrowed: [],
      });
      await user.save();
      const res = await mockRequest(app).get(USERS_API + '/' + user._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', user.name);
    });

    it('should return 400 error when invalid object id is passed', async () => {
      const res = await mockRequest(app).get(USERS_API+'/'+1);
      expect(res.status).to.equal(400);
    });

    it('should return 404 error when user id does not exist', async () => {
      const res = await mockRequest(app).get(USERS_API +'/'+ 111111111111);
      expect(res.status).to.equal(404);
    });
  });
  describe("POST /", () => {
    it("should return user when the all request body is valid", async () => {
      const res = await mockRequest(app)
        .post(USERS_API+'/')
        .send({
          name: 'test', email: 'test@gmail.com', password: generatePasswordHash('test'), books_borrowed: [],
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("name", "test");
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe("PUT /:id", () => {
    it("should update the existing order and return 200", async () => {
      const user = new User({
        name: 'test', email: 'test@gmail.com', password: generatePasswordHash('test'), books_borrowed: [],
      });
      await user.save();

      const res = await mockRequest(app)
        .put(USERS_API+'/' + user._id)
        .send({
          name: 'newTest', email: 'test1@gmail.com', password: generatePasswordHash('test'), books_borrowed: [],
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "newTest");
    });
  });

  describe("DELETE /:id", () => {
    it("should delete requested id and return response 200", async () => {
      const user = new User({
        name: 'test', email: 'test@gmail.com', password: generatePasswordHash('test'), books_borrowed: [],
      });
      await user.save();

      const res = await mockRequest(app).delete(USERS_API+'/' + user._id);
      expect(res.status).to.be.equal(200);
    });

    it("should return 404 when deleted user is requested", async () => {
      const user = new User({
        name: 'test', email: 'test@gmail.com', password: generatePasswordHash('test'), books_borrowed: [],
      });
      await user.save();

      let res = await mockRequest(app).delete(USERS_API+'/'+ user._id);
      expect(res.status).to.be.equal(200);

      res = await mockRequest(app).get(USERS_API+'/'+ user._id);
      expect(res.status).to.be.equal(404);
    });
  });
});


