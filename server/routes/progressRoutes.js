const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  getProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");

const router = express.Router();

router.get("/", auth, getProgress);
router.put("/:storyId", auth, updateProgress);
router.delete("/:storyId", auth, deleteProgress);

module.exports = router;
