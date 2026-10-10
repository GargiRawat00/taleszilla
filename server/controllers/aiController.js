const {
    generateWithAI
} = require("../services/storyGenerator");

const {
    stories
} = require("./storyController");

const {
    activities
} = require("../data");

const generateStory = async (req, res) => {
    try {
        const {
            theme,
            emotion,
            ageGroup,
            characters,
            storyLength
        } = req.body;

        if (
            !theme ||
            !emotion ||
            !ageGroup ||
            !characters
        ) {
            return res.status(400).json({
                message:
                    "theme, emotion, ageGroup and characters are required"
            });
        }

        if (
            !Array.isArray(characters) ||
            characters.length === 0
        ) {
            return res.status(400).json({
                message:
                    "characters must be a non-empty array"
            });
        }

        const allowedLengths = [
            "short",
            "medium",
            "long"
        ];

        const length =
            storyLength || "medium";

        if (!allowedLengths.includes(length)) {
            return res.status(400).json({
                message:
                    "storyLength must be short, medium or long"
            });
        }

        const generated =
            await generateWithAI({
                theme,
                emotion,
                ageGroup,
                characters,
                storyLength: length
            });

        const story = {
            id: Date.now().toString(),

            ...generated,

            generatedByAI: true,

            createdBy: req.user.id,

            createdAt:
                new Date().toISOString()
        };

        stories.push(story);

        activities.push({
            id:
                (Date.now() + 1).toString(),

            userId: req.user.id,

            type: "story_generated",

            storyId: story.id,

            metadata: {
                theme,
                emotion
            },

            createdAt:
                new Date().toISOString()
        });

        res.status(201).json({
            message:
                "Story generated successfully",

            story
        });

    } catch (err) {
        console.error(
            "AI generation error:",
            err.message
        );

        res.status(500).json({
            message:
                "Unable to generate story",
            error: err.message
        });
    }
};

module.exports = {
    generateStory
};
