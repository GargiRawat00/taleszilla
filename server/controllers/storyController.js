const Story = require("../models/Story");

const getStories = async (req, res) => {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
};

const getStory = async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (!story)
        return res.status(404).json({ message: "Story not found" });

    res.json(story);
};

const createStory = async (req, res) => {
    const story = await Story.create({
        ...req.body,
        createdBy: req.user._id
    });

    res.status(201).json(story);
};

const deleteStory = async (req, res) => {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (!story)
        return res.status(404).json({ message: "Story not found" });

    res.json({ message: "Story deleted" });
};

module.exports = {
    getStories,
    getStory,
    createStory,
    deleteStory
};
