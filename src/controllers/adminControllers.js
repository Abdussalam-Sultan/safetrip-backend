/* import { deleteUserService, getAllUsersServices, getSingleUserService, getStatsService } from "../services/adminService.js";


export const getAllUsers = async (req, res) => {
    const users = await getAllUsersServices();
    if (!users) return res.status(500).json({ message: "Error fetching all users"});

    res.status(200).json({ success: true, message: "All users retrieved", users});
};

export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const user = await getSingleUserService(id);
    if (!user) return res.status(404).json({ message: "User does not exist"});

    res.status(200).json({ success: true, message: "User detail retrieved", user});
};

export const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await deleteUserService(id);

    if (!user) return res.status(404).json({ message: "Invalid parameter "});

    res.status(200).json({ success: true, message: `User ${id} deleted successfully`});
};

export const getStats = async (req, res) => {
    const stats = await getStatsService();

    if (!stats) return res.status(500).json({ message: "Error fetching statistics" });

    return res.status(200).json({ success: true, message: "SafeTrip stats fetched successfully", stats});
}; */


// src/controllers/adminController.js
import User from "../models/User.js";
import Sos from "../models/SOSAlert.js";
import CheckIn from "../models/CheckIn.js";
import Contact from "../models/Contact.js";

// GET all users
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

// DELETE user by ID
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

// GET all SOS alerts
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

// GET all Check-Ins
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

// GET all Contacts
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

// Dashboard overview (stats)
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


