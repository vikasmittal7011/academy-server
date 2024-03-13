import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "vikasaggrawal700@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

export default transporter;
