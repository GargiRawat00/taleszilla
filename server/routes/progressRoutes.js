const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getProgress,
    getStoryProgress,
    updateProgress,
    deleteProgress
} = require("../controllers/progressController");

router.get("/", auth, getProgress);

router.get("/:storyId", auth, getStoryProgress);

router.put("/:storyId", auth, updateProgress);

router.delete("/:storyId", auth, deleteProgress);

module.exports = router;
