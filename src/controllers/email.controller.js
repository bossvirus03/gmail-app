const EmailService = require("../sevices/email.service");

module.exports = {
  inboxView: EmailService.listInbox,
  composeView: EmailService.composeView,
  postCompose: EmailService.postCompose,
  sentView: EmailService.sentView,
  emailDetailView: EmailService.emailDetailView,
  deleteEmail: EmailService.deleteEmail,
};
