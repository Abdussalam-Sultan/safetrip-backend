import Contact from "../models/Contact.js";
import AppError from "../utils/AppError.js";

export const addContact = async (req, res) => {
  try {
    const userId = req.user?.id;
    const {name, phone, email, relationship } = req.body;

    if (!userId || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: "userId, name, and phone are required"
      });
    }

    const contact = await Contact.create({
      user_UUID: userId,
      name,
      phone,
      email,
      relationship
    });

    res.status(201).json({
      success: true,
      message: "Emergency contact added successfully",
      data: contact
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserContacts = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    const contacts = await Contact.findAll({
      where: { user_UUID: userId, },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const contact = await Contact.findByPk(id);
    
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    
    if (contact.user_UUID !== userId) {
      res.status(403).json({ error: "You are not authorized to delete this contact" });
    };


    await contact.update(req.body);
    res.json({ success: true, message: `Contact ${id} updated sucessfully`, data: contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const contact = await Contact.findByPk(id);
    
    if (!contact) {
      res.status(400).json({ error: "Contact not found" });
    };

    if (contact.user_UUID !== userId) {
      res.status(403).json({ error: "You are not authorized to delete this contact" });
    }

    const deleted = await contact.destroy();

    res.json({ success: true, message: `Contact ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
