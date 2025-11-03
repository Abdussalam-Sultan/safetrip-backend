const Contact = require("../models/contact");

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { userId, name, phone, email, relationship } = req.body;

    const contact = await Contact.create({ userId, name, phone, email, relationship });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get contacts by userId
exports.getContactsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const contacts = await Contact.findAll({ where: { userId } });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.destroy();
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};