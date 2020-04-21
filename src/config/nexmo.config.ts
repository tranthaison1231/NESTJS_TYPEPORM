import { NEXMO_KEY, NEXMO_SECRET_KEY } from '../environments';

const Nexmo = require('nexmo');

export const nexmo = new Nexmo({
  apiKey: NEXMO_KEY,
  apiSecret: NEXMO_SECRET_KEY,
});
