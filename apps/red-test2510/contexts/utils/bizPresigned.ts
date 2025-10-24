'use server';

import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { UploadFile } from 'antd';
import { getContentType } from '@repo/util';

export async function bizPresigned(fileName: string, userId: string) {
  const returnData: { result: any; errorMessage: any } = {
    result: null,
    errorMessage: null,
  };

  try {
    const config = {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      region: 'ap-northeast-2',
    };
    const s3 = new S3Client(config);

    const extension = fileName.split('.').pop();

    if (!extension) throw { message: '파일에 오류가 있습니다' };

    const Key = `0101/customer/0101_CRN_${userId}.${extension}`;

    const Bucket = process.env.AWS_BIZ_BUCKET;
    const Conditions = [{ acl: 'public-read' }];
    const Fields = {
      acl: 'public-read',
      key: Key,
      'Content-Type': getContentType(extension),
    };

    const params = {
      Key,
      Bucket,
      Conditions,
      Fields,
      'Content-Type': getContentType(extension),
    };

    const testResult = await createPresignedPost(s3, params);

    returnData.result = testResult;
  } catch (err: any) {
    returnData.errorMessage = err.message;
  }
  return returnData;
}
