import { Req, Res, Injectable, Inject, HttpStatus, Logger, HttpException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } from '../environments';

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

@Injectable()
export class AwsService {
  public async uploadFile(file: any): Promise<String> {
    const urlKey = `filepath/${file.name}`;
    const params = {
        Body: file.buffer,
        Bucket: AWS_S3_BUCKET_NAME,
        Key: urlKey,
    }
    const data = await s3.putObject(params).promise().then(info => {
        return urlKey;
    }, err => {
        return err;
    });
    console.log(data);
    return data;
  }
}