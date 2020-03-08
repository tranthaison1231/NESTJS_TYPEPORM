import * as nodemailer from 'nodemailer';
import { SENDGRID_API_KEY } from '@/environments';

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

  const MAIL_BODY = `<b>Hello world?</b> <a href="${link}">confirm Email</a>`;

  try {
    const info = await transporter.sendMail({
      from: '<thanhhuyenpoo13@gmail.com>',
      to: email,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: MAIL_BODY,
    });
    console.log(info);
    console.log(`Message sent: ${email}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
