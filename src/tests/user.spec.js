const mockRequest = require('supertest');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');
const app = require('../app');
const { USERS_API } = require('../models/constants');

const generatePasswordHash = (pwd) => bcrypt.hashSync(pwd, 10);
// const comparePassword = (pwd, hash) => bcrypt.compareSync(pwd, hash); // true

describe('api/users', () => {
  // Test setup
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('Get /', () => {
    it('should return all users', async () => {
      const tempUsers = [{
        name: 'test', email: 'test@gmail.com', password: generatePasswordHash('test'), books_issued: [],
      },
      {
        name: 'test1', email: 'test1@gmail.com', password: generatePasswordHash('test1'), books_issued: [],
      },
      ];
      await User.insertMany(tempUsers);
      const res = await mockRequest(app).get(USERS_API);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });
});
