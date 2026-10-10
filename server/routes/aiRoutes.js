const express = require("express");
const auth = require("../middleware/authMiddleware");
const { generateStory } = require("../controllers/aiController");

const router = express.Router();

router.post("/generate-story", auth, generateStory);

module.exports = router;
