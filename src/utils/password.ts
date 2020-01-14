import { hash, compare } from 'bcrypt';
import { SALT } from '../environments';

export const hashPassword = async (
  password: string,
  salt: string = SALT,
): Promise<string> => {
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
