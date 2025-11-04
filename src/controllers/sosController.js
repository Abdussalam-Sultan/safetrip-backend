import SOS from '../models/SOS.js';
import logger from '../config/logger.js';
import AppError from '../utils/AppError.js';

export const createSOS = async (req, res) => {
  try {
    const { location, latitude, longitude, description, severityLevel } = req.body;
    const userId = req.user?.id;

    if (!userId || !location) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    const sos = await SOS.create({
      userId,
      location,
      latitude: latitude || null,
      longitude: longitude || null,
      description: description || 'Emergency SOS triggered',
      severityLevel: severityLevel || 'high',
      status: 'active'
    });

    logger.info(SOS created for user ${userId}: ${sos.id});

    res.status(201).json({
      success: true,
      message: 'SOS alert created successfully',
      data: sos,
    });
  } catch (error) {
    logger.error(Error creating SOS: ${error.message});
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
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      message: 'SOS events retrieved successfully',
      data: sosEvents,
    });
  } catch (error) {
    logger.error(Error fetching SOS events: ${error.message});
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve SOS events',
      error: error.message 
    });
  }
};

export const updateSOSStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    if (!['active', 'resolved'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be "active" or "resolved"' 
      });
    }

    const sos = await SOS.findOne({ where: { id, userId } });

    if (!sos) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOS event not found' 
      });
    }

    sos.status = status;
    if (status === 'resolved') {
      sos.resolvedAt = new Date();
    }
    
    await sos.save();

    logger.info(SOS ${id} status updated to ${status});

    res.status(200).json({
      success: true,
      message: 'SOS status updated successfully',
      data: sos
    });
  } catch (error) {
    logger.error(Error updating SOS status: ${error.message});
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update SOS status',
      error: error.message 
    });
  }
};