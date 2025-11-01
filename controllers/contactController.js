const Contact = require('../models/contactModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// CREATE
exports.createContact = [auth, async (req, res) => {
  const contact = await Contact.create({ ...req.body, user: req.user._id });
  res.status(201).json(contact);
}];

// READ (Get all user contacts)
exports.getContacts = [auth, async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
}];

// UPDATE
exports.updateContact = [auth, async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(contact);
}];

// DELETE
exports.deleteContact = [auth, async (req, res) => {
  await Contact.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Contact deleted' });
}];