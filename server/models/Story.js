const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    theme: String,

    emotion: String,

    ageGroup: String,

    characters: [String],

    eqLesson: String,

    eqSkills: [String],

    reflectionQuestions: [String],

    image: String,

    generatedByAI: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Story", storySchema);
