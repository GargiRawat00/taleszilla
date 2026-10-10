const Activity = require("../models/Activity");

const getActivities = async (req, res) => {
    const data = await Activity.find({
        userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(data);
};

const createActivity = async (req, res) => {
    const { type, storyId, metadata } = req.body;

    const activity = await Activity.create({
        userId: req.user._id,
        type,
        storyId,
        metadata
    });

    res.status(201).json({
        message: "Activity created",
        activity
    });
};

module.exports = {
    getActivities,
    createActivity
};
