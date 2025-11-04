import SOS from "../models/SOSAlert.js";
import CheckIn from "../models/CheckIn.js";

export const getUserTimeline = async (req, res) => {
  try {
    const { userId } = req.user?.id;

    const sosList = await SOS.findAll({ where: { userId } });
    const checkInList = await CheckIn.findAll({ where: { userId } });

    const sosEvents = sosList.map(item => ({
      id: item.id,
      type: "sos",
      message: item.message,
      location: item.location,
      createdAt: item.createdAt,
    }));

    const checkInEvents = checkInList.map(item => ({
      id: item.id,
      type: "checkin",
      message: item.message,
      location: item.location,
      createdAt: item.createdAt,
    }));

    const timeline = [...sosEvents, ...checkInEvents].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({ success: true, data: timeline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
