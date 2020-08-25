const mongoose = require('mongoose');
const { User } = require('../models/user.model');

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.send(users);
};

module.exports.getUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send('Invalid object id');
  const user = await User.findById(userId);
  if (!user) return res.status(404).send('User not found');
  return res.send(user);
};

module.exports.createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    books_borrowed: req.body.books_borrowed,
  });
  await user.save();
  return res.send(user);
};

module.exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  User.findOneAndUpdate(userId, req.body, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  return res.send('User deleted');
};
