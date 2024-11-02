const express = require("express");
const router = express.Router();
const InboxController = require("../controllers/email.controller.js");

router.get("/inbox", InboxController.inboxView);
router.get("/compose", InboxController.composeView);
router.post("/compose", InboxController.postCompose);
router.get("/sent", InboxController.sentView);
router.get("/email/:id", InboxController.emailDetailView);
router.delete("email/:id", InboxController.deleteEmail);
module.exports = router;
