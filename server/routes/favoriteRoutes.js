const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getFavorites,
    addFavorite,
    removeFavorite
} = require("../controllers/favoriteController");

router.get("/", auth, getFavorites);

router.post("/:storyId", auth, addFavorite);

router.delete("/:storyId", auth, removeFavorite);

module.exports = router;
