const User = require("../models/User");
const Story = require("../models/Story");

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    const result = user.favorites.map((story) => ({
      storyId: story._id,
      story,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addFavorite = async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user.favorites.includes(story._id)) {
      user.favorites.push(story._id);
      await user.save();
    }

    res.json({
      message: "Added to favorites",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.storyId,
    );

    await user.save();

    res.json({
      message: "Removed from favorites",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
