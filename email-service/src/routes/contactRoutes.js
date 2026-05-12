const express = require("express");
const { sendMessage } = require("../controllers/contactController");

const router = express.Router();

router.post("/send-message", sendMessage);

module.exports = router;
