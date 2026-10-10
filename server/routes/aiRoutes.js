const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const {
    generateStory
} = require("../controllers/aiController");

router.post(
    "/generate-story",
    auth,
    generateStory
);

module.exports = router;
