/* eslint-disable global-require */
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from '../environments';

export const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
