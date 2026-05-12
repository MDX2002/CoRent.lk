const mailService = require("../services/mailService");

const sendMessage = async (req, res) => {
  const { name, email, message, listingTitle, listingId } = req.body;

  try {
    await mailService.sendContactMail({ name, email, message, listingTitle, listingId });
    res.status(200).json({ success: true, msg: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { sendMessage };
