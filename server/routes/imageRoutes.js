const express = require("express");

const router = express.Router();

const {
    getStoryImage
} = require("../controllers/imageController");

router.get(
    "/story",
    getStoryImage
);

module.exports = router;
