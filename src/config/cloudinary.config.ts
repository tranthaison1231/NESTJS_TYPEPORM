const cloudinary = require('cloudinary');

export const uploadImage = async (file: any): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || 'xxx',
    api_key: process.env.CLOUDINARY_KEY || 'xxx',
    api_secret: process.env.CLOUDINARY_SECRET_KEY || 'xxx',
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
