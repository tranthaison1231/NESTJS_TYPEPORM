import {
  CLOUDINARY_SECRET_KEY,
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
} from '@/environments';

const cloudinary = require('cloudinary');

export const uploadImage = async (file: any): Promise<string> => {
  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
  });

  const uniqueFilename = new Date().toISOString();

  const result = await new Promise(async (resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: 'rest',
          public_id: uniqueFilename,
          tags: 'rest',
        },
        (err, image) => {
          if (err) {
            reject(err);
          }
          resolve(image);
        },
      )
      .end(file.buffer);
  });

  return result['secure_url'];
};
