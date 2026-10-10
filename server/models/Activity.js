const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    type: {
        type: String,
        required: true
    },

    storyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    },

    metadata: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Activity", activitySchema);
