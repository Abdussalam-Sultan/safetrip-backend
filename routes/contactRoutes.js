const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user ID to the request
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // attach user ID to request object
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Authorization token missing' });
  }
};

// Add a new contact
router.post('/', protect, async (req, res, next) => {
  try {
    const { name, phone, email, relationship } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

   // basic phone check
    if (phone.length !== 11) {
      return res.status(400).json({ success: false, message: 'Phone number must be 11 digits' });
    }

    // basic email check
    if (email && !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }

    const contact = await Contact.create({
      user: req.userId,
      name,
      phone,
      email,
      relationship,
    });

    res.status(201).json({
      success: true,
      message: 'Contact added successfully',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
});

// Get contacts with pagination
router.get('/', protect, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalContacts = await Contact.countDocuments({ user: req.userId });

    const contacts = await Contact.find({ user: req.userId })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      page,
      totalPages: Math.ceil(totalContacts / limit),
      totalContacts,
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
});

// Search contacts by name or phone
router.get('/search', protect, async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ success: false, message: 'Please provide a search query' });
    }

    const results = await Contact.find({
      user: req.userId,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      message: 'Search results retrieved',
      data: results,
    });
  } catch (err) {
    next(err);
  }
});

// Get a single contact by ID
router.get('/:id', protect, async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.userId });

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Contact details retrieved',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
});

// Update a contact
router.put('/:id', protect, async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.userId });

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    Object.assign(contact, req.body);
    const updatedContact = await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
});

// Delete a contact
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.userId });

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    await contact.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Contact removed successfully',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;