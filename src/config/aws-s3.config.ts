// import * as AWS from 'aws-sdk';
// import * as multerS3 from 'multer-s3';
// import * as multer from 'multer';
// import s3Storage = require('multer-sharp-s3');

// import {
//   AWS_S3_BUCKET_NAME,
//   AWS_ACCESS_KEY_ID,
//   AWS_SECRET_ACCESS_KEY,
// } from '@/environments';

// const s3 = new AWS.S3();

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
// });

// export const upLoadImagetoS3 = multer({
//   storage: s3Storage({
//     s3,
//     bucket: AWS_S3_BUCKET_NAME,
//     acl: 'public-read',
//     key: function(request, file, cb) {
//       cb(null, `${Date.now().toString()} - ${file.originalname}`);
//     },
//     resize: {
//       width: 600,
//       height: 400,
//     },
//   }),
// }).array('upload', 1);
