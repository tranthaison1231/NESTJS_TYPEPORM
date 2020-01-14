import * as nodemailer from 'nodemailer';
import { SENDGRID_API_KEY } from '../environments';

export const sendEmail = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: SENDGRID_API_KEY,
    },
  });

  const info = await transporter.sendMail({
    from: '<thanhhuyenpoo13@gmail.com>',
    to: email,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: `<b>Hello world?</b> <a href="${link}">confirm Email</a>`,
  });
  console.log('Message sent: %s', info.messageId);
};
