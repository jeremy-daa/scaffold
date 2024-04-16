import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const mailOptions = (
  name: string,
  email: string,
  phone: string,
  message: string
) => {
  return {
    from: process.env.GOOGLE_EMAIL,
    to: process.env.GOOGLE_EMAIL,
    subject: "New Contact Form Submission",
    text: ` Name: ${name} \n Email: ${email} \n Phone Number: \n\n Message: ${message} `,
  };
};
