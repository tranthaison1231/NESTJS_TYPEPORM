/* eslint-disable no-console */
import { EMAIL_SEND, SENDGRID_API_KEY } from '@/environments';
import * as handlebars from 'handlebars';
import * as sgMail from '@sendgrid/mail';
import * as fs from 'fs-extra';
import * as path from 'path';

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

export interface DynamicTemplateData {
  subject: string;
  preheader: string;
  content: string;
}

export interface EmailOptions {
  from?: string;
  to: string;
  html?: string;
  templateId?: string;
  text?: string;
  dynamicTemplateData: DynamicTemplateData;
}

export const sendEmail = async ({
  from = EMAIL_SEND,
  to,
  html,
  templateId = 'd-e2a11c581ce64bf4b13c422819352d7f',
  text = 'Hello world?',
  dynamicTemplateData,
}: EmailOptions): Promise<void> => {
  try {
    const info = await sgMail.send({
      from,
      to,
      html,
      text,
      templateId,
      dynamicTemplateData,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
