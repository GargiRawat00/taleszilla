const Progress = require("../models/Progress");
const Story = require("../models/Story");

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.user.id,
    }).populate("storyId");

    res.json(progress);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { percentage, completed } = req.body;

    const story = await Story.findById(req.params.storyId);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.user.id,
        storyId: req.params.storyId,
      },
      {
        percentage,
        completed,
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.json(progress);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteProgress = async (req, res) => {
  try {
    await Progress.findOneAndDelete({
      userId: req.user.id,
      storyId: req.params.storyId,
    });

    res.json({
      message: "Progress deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProgress,
  updateProgress,
  deleteProgress,
};
