const { progress } = require("../data");
const { stories } = require("./storyController");

const getProgress = (req, res) => {
    const userProgress = progress
        .filter(p => p.userId === req.user.id)
        .map(p => ({
            ...p,
            story: stories.find(s => s.id === p.storyId)
        }));

    res.json(userProgress);
};

const getStoryProgress = (req, res) => {
    const item = progress.find(
        p =>
            p.userId === req.user.id &&
            p.storyId === req.params.storyId
    );

    if (!item) {
        return res.status(404).json({
            message: "Progress not found"
        });
    }

    res.json(item);
};

const updateProgress = (req, res) => {
    const { storyId } = req.params;

    let { percentage, completed } = req.body;

    const story = stories.find(s => s.id === storyId);

    if (!story) {
        return res.status(404).json({
            message: "Story not found"
        });
    }

    percentage = Number(percentage);

    if (
        Number.isNaN(percentage) ||
        percentage < 0 ||
        percentage > 100
    ) {
        return res.status(400).json({
            message: "Percentage must be between 0 and 100"
        });
    }

    let item = progress.find(
        p =>
            p.userId === req.user.id &&
            p.storyId === storyId
    );

    if (item) {
        item.percentage = percentage;
        item.completed =
            completed !== undefined
                ? completed
                : percentage === 100;

        item.updatedAt = new Date().toISOString();

        return res.json({
            message: "Progress updated",
            progress: item
        });
    }

    item = {
        id: Date.now().toString(),
        userId: req.user.id,
        storyId,
        percentage,
        completed:
            completed !== undefined
                ? completed
                : percentage === 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    progress.push(item);

    res.status(201).json({
        message: "Progress created",
        progress: item
    });
};

const deleteProgress = (req, res) => {
    const index = progress.findIndex(
        p =>
            p.userId === req.user.id &&
            p.storyId === req.params.storyId
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Progress not found"
        });
    }

    progress.splice(index, 1);

    res.json({
        message: "Progress deleted"
    });
};

module.exports = {
    getProgress,
    getStoryProgress,
    updateProgress,
    deleteProgress
};
