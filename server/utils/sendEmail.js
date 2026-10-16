const nodemailer = require("nodemailer");

// Debug (Temporary)
console.log("================================");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS Loaded:", !!process.env.EMAIL_PASS);
console.log("================================");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ email, subject, html }) => {
  await transporter.sendMail({
    from: `"EduNotes" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};

module.exports = sendEmail;