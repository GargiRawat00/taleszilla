const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoriteController");

const router = express.Router();

router.get("/", auth, getFavorites);
router.post("/:storyId", auth, addFavorite);
router.delete("/:storyId", auth, removeFavorite);

module.exports = router;
