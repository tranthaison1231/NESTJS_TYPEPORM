/* eslint-disable no-console */
import { EMAIL_SEND, SENDGRID_API_KEY } from '@/environments';
import * as fs from 'fs-extra';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(SENDGRID_API_KEY);
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
  html: string;
  templateId?: string;
  dynamicTemplateData?: { [key: string]: any };
}

export const sendEmail = async ({
  from = EMAIL_SEND,
  to,
  html,
  templateId = 'd-e2a11c581ce64bf4b13c422819352d7f',
  dynamicTemplateData = {},
}: EmailOptions): Promise<void> => {
  try {
    await sgMail.send({
      to,
      from,
      html,
      templateId,
      dynamicTemplateData,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
