import Contact from "../models/Contact.js";

export const addContact = async (req, res) => {
  try {
    const { userId, name, phone, email, relationship } = req.body;

    if (!userId || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: "userId, name, and phone are required"
      });
    }

    const contact = await Contact.create({
      userId,
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
    const { userId } = req.user?.id;

    const contacts = await Contact.findAll({
      where: { userId },
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

    const contact = await Contact.findByPk(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
