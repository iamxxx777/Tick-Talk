const router = require("express").Router();
const { getMessages, newMessage } = require("../controllers/messagesController");

router.get("/", getMessages);

router.post("/", newMessage);

module.exports = router;