import CheckIn from "../models/CheckIn.js";
import helpServices from "../services/helpServices.js";

export const createCheckIn = async (req, res) => {
  try {
    const { location, latitude, longitude, message} = req.body;
    const userId = req.user?.id;

    if (!userId || !latitude || !longitude) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const checkIn = await CheckIn.create({
      user_UUID: userId,
      latitude,
      longitude,
      location: location || await helpServices.coordToLocation(latitude, longitude) || "Unknown location",
      message: message || "I'm safe",
    });

    res.status(201).json({
      success: true,
      message: "Check-in recorded successfully",
      data: checkIn,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserCheckIns = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    const checkIns = await CheckIn.findAll({ where: { user_UUID:userId },
    order: [['createdAt', 'DESC']],
   });

    res.status(200).json({
      success: true,
      message: "User check-ins retrieved successfully",
      data: checkIns,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
