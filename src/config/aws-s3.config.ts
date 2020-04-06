import * as AWS from 'aws-sdk';

import {
  AWS_S3_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from '@/environments';
import { Logger } from '@nestjs/common';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});


export const upLoadImagetoS3 = async (file: any): Promise<any> => {
  const urlKey =  new Date().toISOString();
  const params = {
    Body: file.buffer,
    Bucket: AWS_S3_BUCKET_NAME,
    Key: urlKey,
  }
  
  return new Promise((resolve, reject) => {
    s3.putObject(params).promise().then(data => {
      Logger.log(`success[S3]: ${JSON.stringify(data)}`);
      resolve(data);
    }).catch(err=> {
        reject(err);
    });
  });
}
