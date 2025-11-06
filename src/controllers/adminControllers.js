
import { User, SOSAlert as Sos, CheckIn, Contact, Tip} from "../models/index.js"


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["user_UUID", "username", "email", "role", "createdAt"],
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
      attributes: ["id", "user_UUID", "message", "latitude", "longitude", "createdAt"],
    });
    res.json(sos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch SOS alerts", error: error.message });
  }
};

export const getAllCheckIns = async (req, res) => {
  try {
    const checkins = await CheckIn.findAll({
      attributes: ["checkin_UUID", "user_UUID", "message", "latitude", "longitude", "createdAt"],
    });
    res.json(checkins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch check-ins", error: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      attributes: ["id", "user_UUID", "name", "phone", "email"],
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
    const totalTips = await Tip.count();

    res.json({
      totalUsers,
      totalSos,
      totalCheckIns,
      totalContacts,
      totalTips
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch overview", error: error.message });
  }
};



export const createTip = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.id;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const tip = await Tip.create({ title, content, user_UUID: userId });

    return res.status(201).json({
      success: true,
      message: "Tip created successfully",
      data: tip,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.findAll({ order: [["createdAt", "DESC"]] });

    return res.status(200).json({
      success: true,
      count: tips.length,
      data: tips,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const updateTip = async (req, res) => {
  try {
    const { id } = req.params;
    const tip = await Tip.findByPk(id);

    if (!tip) return res.status(404).json({ success: false, message: "Tip not found" });

    await tip.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Tip updated successfully",
      data: tip,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const deleteTip = async (req, res) => {
  try {
    const { id } = req.params;
    const tip = await Tip.findByPk(id);

    if (!tip) return res.status(404).json({ success: false, message: "Tip not found" });

    await tip.destroy();

    return res.status(200).json({
      success: true,
      message: "Tip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
