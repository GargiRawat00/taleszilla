const User = require("../models/User");
const Story = require("../models/Story");

const getFavorites = async (req, res) => {
    const user = await User.findById(req.user._id)
        .populate("favorites");

    res.json(
        user.favorites.map(story => ({
            storyId: story._id,
            story
        }))
    );
};

const addFavorite = async (req, res) => {
    const story = await Story.findById(req.params.storyId);

    if (!story)
        return res.status(404).json({ message: "Story not found" });

    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(story._id))
        user.favorites.push(story._id);

    await user.save();

    res.status(201).json({
        message: "Story added to favorites"
    });
};

const removeFavorite = async (req, res) => {
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
        id => id.toString() !== req.params.storyId
    );

    await user.save();

    res.json({
        message: "Story removed from favorites"
    });
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
};
