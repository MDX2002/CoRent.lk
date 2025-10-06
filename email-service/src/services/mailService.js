const transporter = require("../config/mailer");

const sendContactMail = async ({ name, email, message, listingTitle, listingId }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Inquiry for ${listingTitle}`,
      text: `
        📩 New message about: ${listingTitle} (ID: ${listingId})
        👤 Name: ${name}
        📝 Message: ${message}
      `,
    });
    console.log("Email sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


module.exports = { sendContactMail };
