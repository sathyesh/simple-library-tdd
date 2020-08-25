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
      const res = await mockRequest(app).get(USERS_API);
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
      const res = await mockRequest(app).get(USERS_API + user._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', user.name);
    });

    it('should return 400 error when invalid object id is passed', async () => {
      const res = await mockRequest(app).get(`${USERS_API}1`);
      expect(res.status).to.equal(400);
    });

    it('should return 404 error when user id does not exist', async () => {
      const res = await mockRequest(app).get(`${USERS_API}111111111111`);
      expect(res.status).to.equal(404);
    });
  });
});
