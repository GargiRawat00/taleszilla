const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  getActivities,
  createActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/", auth, getActivities);
router.post("/", auth, createActivity);

module.exports = router;
