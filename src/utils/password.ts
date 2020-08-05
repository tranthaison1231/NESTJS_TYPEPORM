/* eslint-disable no-return-await */
import * as bcrypt from 'bcrypt';
import { SALT } from '../environments';

export const hashPassword = async (
  password: string,
  salt: string = SALT,
): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
