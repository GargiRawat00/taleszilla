const Story = require("../models/Story");

const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.json(story);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createStory = async (req, res) => {
  try {
    const story = await Story.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.json({
      message: "Story deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getStories,
  getStory,
  createStory,
  deleteStory,
};
