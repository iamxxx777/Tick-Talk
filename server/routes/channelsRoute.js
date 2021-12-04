const router = require('express').Router();
const { createChannel, getChannel, getAllChannels } = require("../controllers/channelsController");

router.get("/", getAllChannels);

router.get("/:id", getChannel);

router.post("/", createChannel);

module.exports = router;