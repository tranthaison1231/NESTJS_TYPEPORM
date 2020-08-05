/* eslint-disable no-console */
import * as nodemailer from 'nodemailer';
import { EMAIL_SEND } from '@/environments';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import { mailConfig } from '../config/mail.config';

const asyncReadFile = util.promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure,
  auth: {
    user: mailConfig.auth.user,
    pass: mailConfig.auth.pass,
  },
});

export const renderEmailContent = async ({ template, data }) => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    `${template}.hbs`,
  );
  const rawContent = await asyncReadFile(templatePath, 'utf8');
  return handlebars.compile(rawContent)(data);
};

export const sendEmail = async (email: string, content: string) => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_SEND,
      to: email,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: content,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
