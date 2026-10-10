const Story = require("../models/Story");
const { generateWithAI } = require("../services/storyGenerator");

const generateStory = async (req, res) => {
  try {
    const { theme, emotion, ageGroup, characters, storyLength } = req.body;

    if (
      !theme ||
      !emotion ||
      !ageGroup ||
      !Array.isArray(characters) ||
      !characters.length
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const generated = await generateWithAI({
      theme,
      emotion,
      ageGroup,
      characters,
      storyLength,
    });

    const story = await Story.create({
      ...generated,
      generatedByAI: true,
      createdBy: req.user.id,
    });

    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({
      message: "Unable to generate story",
      error: err.message,
    });
  }
};

module.exports = {
  generateStory,
};
