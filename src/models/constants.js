require('dotenv/config');

const USERS_API = `${process.env.API_VERSION}/api/users`;
const BOOKS_API = `${process.env.API_VERSION}/api/books`;

module.exports = {
  USERS_API,
  BOOKS_API,
};
