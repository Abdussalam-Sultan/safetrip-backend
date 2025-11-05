import SOS from '../models/SOSAlert.js';
import logger from '../config/logger.js';
import helpService from '../services/helpServices.js'

export const createSOS = async (req, res) => {
  try {
    const { location, latitude, longitude, description, severityLevel } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    const sos = await SOS.create({
      user_UUID: userId,
      location: location || await helpService.coordToLocation(latitude, longitude) ,
      latitude: latitude || null,
      longitude: longitude || null,
      description: description || 'Emergency SOS triggered',
      severityLevel: severityLevel || 'high',
      status: 'active'
    });

    logger.info(`SOS created for user ${userId}: ${sos.id}`);

    res.status(201).json({
      success: true,
      message: 'SOS alert created successfully',
      data: sos,
    });
  } catch (error) {
    logger.error(`Error creating SOS: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create SOS alert',
      error: error.message 
    });
  }
};

export const getUserSOSEvents = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }

    const sosEvents = await SOS.findAll({ 
      where: { user_UUID: userId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      message: 'SOS events retrieved successfully',
      data: sosEvents,
    });
  } catch (error) {
    logger.error(`Error fetching SOS events: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve SOS events',
      error: error.message 
    });
  }
};