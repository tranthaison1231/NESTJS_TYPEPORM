/* eslint-disable no-console */
import { EMAIL_SEND } from '@/environments';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { mailConfig } from '../config/mail.config';

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure,
  auth: {
    user: mailConfig.auth.user,
    pass: mailConfig.auth.pass,
  },
});

export interface EmailTemplateOptions {
  template: string;
  data: any;
}

export const renderEmailContent = async ({
  template,
  data,
}: EmailTemplateOptions): Promise<string> => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    `${template}.hbs`,
  );
  const rawContent = await fs.readFile(templatePath, 'utf8');
  return handlebars.compile(rawContent)(data);
};

export interface EmailOptions {
  from?: string;
  to: string;
  subject?: string;
  text?: string;
  html: string;
}

export const sendEmail = async ({
  from = EMAIL_SEND,
  to,
  subject = 'Hello world',
  text = 'Hello world',
  html,
}: EmailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
