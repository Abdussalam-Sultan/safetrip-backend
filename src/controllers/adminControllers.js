
import User from "../models/User.js";
import Sos from "../models/SOSAlert.js";
import CheckIn from "../models/CheckIn.js";
import Contact from "../models/Contact.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt"],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

export const getAllSos = async (req, res) => {
  try {
    const sos = await Sos.findAll({
      attributes: ["id", "userId", "message", "lat", "long", "createdAt"],
    });
    res.json(sos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch SOS alerts", error: error.message });
  }
};

export const getAllCheckIns = async (req, res) => {
  try {
    const checkins = await CheckIn.findAll({
      attributes: ["id", "userId", "message", "lat", "long", "createdAt"],
    });
    res.json(checkins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch check-ins", error: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      attributes: ["id", "userId", "name", "phone", "email"],
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
  }
};

export const getOverview = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalSos = await Sos.count();
    const totalCheckIns = await CheckIn.count();
    const totalContacts = await Contact.count();

    res.json({
      totalUsers,
      totalSos,
      totalCheckIns,
      totalContacts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch overview", error: error.message });
  }
};


