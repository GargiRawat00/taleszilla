const express = require("express");

const router = express.Router();

const {
    getStories,
    getStory,
    createStory,
    deleteStory
} = require("../controllers/storyController");

const auth = require("../middleware/authMiddleware");

router.get("/", getStories);
router.get("/:id", getStory);

router.post("/", auth, createStory);
router.delete("/:id", auth, deleteStory);

module.exports = router;
