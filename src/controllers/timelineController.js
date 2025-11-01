// src/controllers/timelineController.js
import { Op } from 'sequelize';
import CheckIn from '../models/CheckIn.js';
import SOS from '../models/SOS.js';
import logger from '../config/logger.js';
import AppError from '../utils/AppError.js';

/**
 * Get combined timeline of SOS events and Check-ins for a user
 * @route GET /api/timeline
 * @access Private (requires authentication)
 */
export const getUserTimeline = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }

    // Extract query parameters for filtering
    const { startDate, endDate, eventType, limit = 50, offset = 0 } = req.query;

    // Build filter conditions
    const whereConditions = { userId };

    // Add date filtering if provided
    if (startDate || endDate) {
      whereConditions.createdAt = {};
      
      if (startDate) {
        whereConditions.createdAt[Op.gte] = new Date(startDate);
      }
      
      if (endDate) {
        whereConditions.createdAt[Op.lte] = new Date(endDate);
      }
    }

    // Fetch data based on event type filter
    let sosEvents = [];
    let checkIns = [];

    if (!eventType || eventType === 'sos' || eventType === 'all') {
      sosEvents = await SOS.findAll({
        where: whereConditions,
        attributes: [
          'id',
          'userId',
          'location',
          'latitude',
          'longitude',
          'status',
          'description',
          'severityLevel',
          'resolvedAt',
          'createdAt',
          'updatedAt'
        ],
        order: [['createdAt', 'DESC']],
      });
    }

    if (!eventType || eventType === 'checkin' || eventType === 'all') {
      checkIns = await CheckIn.findAll({
        where: whereConditions,
        attributes: [
          'id',
          'userId',
          'location',
          'message',
          'createdAt',
          'updatedAt'
        ],
        order: [['createdAt', 'DESC']],
      });
    }

    // Transform and combine events
    const timelineEvents = [
      ...sosEvents.map(sos => ({
        id: sos.id,
        eventType: 'sos',
        userId: sos.userId,
        location: sos.location,
        latitude: sos.latitude,
        longitude: sos.longitude,
        status: sos.status,
        details: sos.description,
        severityLevel: sos.severityLevel,
        resolvedAt: sos.resolvedAt,
        timestamp: sos.createdAt,
        updatedAt: sos.updatedAt,
      })),
      ...checkIns.map(checkIn => ({
        id: checkIn.id,
        eventType: 'checkin',
        userId: checkIn.userId,
        location: checkIn.location,
        message: checkIn.message,
        details: checkIn.message,
        timestamp: checkIn.createdAt,
        updatedAt: checkIn.updatedAt,
      }))
    ];

    // Sort combined events by timestamp (newest first)
    timelineEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Apply pagination
    const paginatedEvents = timelineEvents.slice(
      parseInt(offset), 
      parseInt(offset) + parseInt(limit)
    );

    logger.info(`Timeline fetched for user ${userId}: ${timelineEvents.length} events`);

    res.status(200).json({
      success: true,
      message: 'Timeline retrieved successfully',
      data: {
        events: paginatedEvents,
        pagination: {
          total: timelineEvents.length,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: (parseInt(offset) + parseInt(limit)) < timelineEvents.length
        }
      }
    });

  } catch (error) {
    logger.error(`Error fetching timeline: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve timeline',
      error: error.message 
    });
  }
};

/**
 * Get timeline statistics for a user
 * @route GET /api/timeline/stats
 * @access Private
 */
export const getTimelineStats = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }

    const { startDate, endDate } = req.query;
    const whereConditions = { userId };

    // Add date filtering
    if (startDate || endDate) {
      whereConditions.createdAt = {};
      if (startDate) whereConditions.createdAt[Op.gte] = new Date(startDate);
      if (endDate) whereConditions.createdAt[Op.lte] = new Date(endDate);
    }

    // Get counts
    const [
      totalSOS,
      activeSOS,
      resolvedSOS,
      criticalSOS,
      totalCheckIns,
      recentCheckIns
    ] = await Promise.all([
      SOS.count({ where: whereConditions }),
      SOS.count({ where: { ...whereConditions, status: 'active' } }),
      SOS.count({ where: { ...whereConditions, status: 'resolved' } }),
      SOS.count({ where: { ...whereConditions, severityLevel: 'critical' } }),
      CheckIn.count({ where: whereConditions }),
      CheckIn.count({ 
        where: { 
          ...whereConditions, 
          createdAt: { [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
        } 
      })
    ]);

    // Get last activity
    const lastSOS = await SOS.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
      attributes: ['createdAt']
    });

    const lastCheckIn = await CheckIn.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
      attributes: ['createdAt']
    });

    const lastActivity = [lastSOS?.createdAt, lastCheckIn?.createdAt]
      .filter(Boolean)
      .sort((a, b) => new Date(b) - new Date(a))[0];

    logger.info(`Timeline stats fetched for user ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Timeline statistics retrieved successfully',
      data: {
        sos: {
          total: totalSOS,
          active: activeSOS,
          resolved: resolvedSOS,
          critical: criticalSOS
        },
        checkIns: {
          total: totalCheckIns,
          lastWeek: recentCheckIns
        },
        totalEvents: totalSOS + totalCheckIns,
        lastActivity: lastActivity || null
      }
    });

  } catch (error) {
    logger.error(`Error fetching timeline stats: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve timeline statistics',
      error: error.message 
    });
  }
};

/**
 * Get timeline events grouped by date
 * @route GET /api/timeline/grouped
 * @access Private
 */
export const getGroupedTimeline = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }

    const { startDate, endDate } = req.query;
    const whereConditions = { userId };

    if (startDate || endDate) {
      whereConditions.createdAt = {};
      if (startDate) whereConditions.createdAt[Op.gte] = new Date(startDate);
      if (endDate) whereConditions.createdAt[Op.lte] = new Date(endDate);
    }

    // Fetch events
    const [sosEvents, checkIns] = await Promise.all([
      SOS.findAll({ where: whereConditions, order: [['createdAt', 'DESC']] }),
      CheckIn.findAll({ where: whereConditions, order: [['createdAt', 'DESC']] })
    ]);

    // Combine and transform events
    const allEvents = [
      ...sosEvents.map(sos => ({
        id: sos.id,
        eventType: 'sos',
        location: sos.location,
        status: sos.status,
        details: sos.description,
        severityLevel: sos.severityLevel,
        timestamp: sos.createdAt,
      })),
      ...checkIns.map(checkIn => ({
        id: checkIn.id,
        eventType: 'checkin',
        location: checkIn.location,
        message: checkIn.message,
        timestamp: checkIn.createdAt,
      }))
    ];

    // Group by date
    const groupedEvents = allEvents.reduce((groups, event) => {
      const date = new Date(event.timestamp).toISOString().split('T')[0];
      
      if (!groups[date]) {
        groups[date] = [];
      }
      
      groups[date].push(event);
      return groups;
    }, {});

    // Sort events within each group
    Object.keys(groupedEvents).forEach(date => {
      groupedEvents[date].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
    });

    logger.info(`Grouped timeline fetched for user ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Grouped timeline retrieved successfully',
      data: groupedEvents
    });

  } catch (error) {
    logger.error(`Error fetching grouped timeline: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve grouped timeline',
      error: error.message 
    });
  }
};