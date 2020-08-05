import { SENDGRID_API_KEY } from '../environments';

export const mailConfig = {
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,
  auth: {
    user: 'apikey',
    pass: SENDGRID_API_KEY,
  },
};
