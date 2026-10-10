const Activity = require("../models/Activity");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.user.id,
    })
      .populate("storyId")
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createActivity = async (req, res) => {
  try {
    const { type, storyId, metadata } = req.body;

    const activity = await Activity.create({
      userId: req.user.id,
      type,
      storyId: storyId || null,
      metadata: metadata || {},
    });

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getActivities,
  createActivity,
};
