import { hash, compare } from 'bcrypt';

export const hashPassword = async (
  password: string,
  salt: string = process.env.SALT,
): Promise<string> => {
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
