import accessEnv from './accessEnv';

export const NODE_ENV: string = accessEnv('NODE_ENV', 'development');

export const PORT: number = +accessEnv('PORT', '8080');

export const URL: string = accessEnv('URL');

export const BCRYPT_SALT: number = +accessEnv('BCRYPT_SALT', '10');

export const UPLOAD_LOCATION: string = accessEnv('UPLOAD_LOCATION', '/files');

export const EXPIRES_IN: number = +accessEnv('EXPIRES_IN', '3600');

export const JWT_SECRET: string = accessEnv('JWT_SECRET');

export const CLOUDINARY_NAME: string = accessEnv('CLOUDINARY_NAME');

export const CLOUDINARY_KEY: string = accessEnv('CLOUDINARY_KEY');

export const CLOUDINARY_SECRET_KEY: string = accessEnv('CLOUDINARY_SECRET_KEY');

export const CLOUDINARY_FORDER: string = accessEnv('CLOUDINARY_FORDER');

export const MAX_FILE_SIZE: number = +accessEnv('MAX_FILE_SIZE', '1000000');

export const RDS_HOSTNAME: string = accessEnv('RDS_HOSTNAME', 'localhost');

export const RDS_PORT: number = +accessEnv('RDS_PORT', '5432');

export const RDS_USERNAME: string = accessEnv('RDS_USERNAME');

export const RDS_PASSWORD: string = accessEnv('RDS_PASSWORD');

export const RDS_DB_NAME: string = accessEnv('RDS_DB_NAME');

export const SALT: string = accessEnv('SALT', 'xxx');

export const SENDGRID_API_KEY: string = accessEnv('SENDGRID_API_KEY');

export const REDIS_PORT: number = +accessEnv('REDIS_PORT', '6379');

export const REDIS_HOST: string = accessEnv('REDIS_HOST', 'localhost');

export const REDIS_FAMILY: number = +accessEnv('REDIS_FAMILY', '4');

export const REDIS_PASSWORD: string = accessEnv('REDIS_PASSWORD');

export const REDIS_DB: number = +accessEnv('REDIS_DB', '0');

// AWS - S3

export const AWS_S3_BUCKET_NAME: string = accessEnv(
  'AWS_S3_BUCKET_NAME',
  'xxx',
);

export const AWS_ACCESS_KEY_ID: string = accessEnv('AWS_ACCESS_KEY_ID', 'xxx');

export const AWS_SECRET_ACCESS_KEY: string = accessEnv(
  'AWS_SECRET_ACCESS_KEY',
  'xxx',
);

export const NEXMO_KEY: string = accessEnv('NEXMO_KEY', 'xxx');

export const NEXMO_SECRET_KEY: string = accessEnv('NEXMO_SECRET_KEY', 'xxx');

export const TELERIVET_KEY: string = accessEnv('TELERIVET_KEY', 'xxx');

export const TELERIVET_PROJECT_ID_KEY: string = accessEnv(
  'TELERIVET_PROJECT_ID_KEY',
  'xxx',
);

export const TWILIO_ACCOUNT_SID: string = accessEnv(
  'TWILIO_ACCOUNT_SID',
  'xxx',
);

export const TWILIO_AUTH_TOKEN: string = accessEnv('TWILIO_AUTH_TOKEN', 'xxx');

export const SPEED_SMS_AUTH_TOKEN: string = accessEnv(
  'SPEED_SMS_AUTH_TOKEN',
  'xxx',
);

export const SPEED_SMS_SENDER: string = accessEnv('SPEED_SMS_SENDER', 'xxx');
