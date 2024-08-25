import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_HOST,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface MailData {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}

async function sendUserMail(mailData: MailData) {
  const { from, to, subject, html } = mailData;
  try {
    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });

    return info.messageId;
  } catch (error) {
    throw error;
  }
}

export default sendUserMail;
