const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    theme: {
      type: String,
      default: "",
    },

    emotion: {
      type: String,
      default: "",
    },

    ageGroup: {
      type: String,
      default: "",
    },

    characters: [
      {
        type: String,
      },
    ],

    eqLesson: {
      type: String,
      default: "",
    },

    eqSkills: [
      {
        type: String,
      },
    ],

    reflectionQuestions: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
      default: "",
    },

    generatedByAI: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Story", storySchema);
