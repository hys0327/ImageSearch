'use server';

import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 } from 'uuid';

// 초기에 pdf 만 업로드로 네이밍 했으나 png도 올라감,,,
// export const getPDFPresignedUrl = async (uploadInfo: {
//   groupName: string;
//   uid: string;
//   lastModified: number;
//   name: string;
// }) => {
//   const returnData: { result: any; errorMessage: any } = {
//     result: null,
//     errorMessage: null,
//   };

//   try {
//     const { uid, groupName, name } = uploadInfo;

//     const uniqId = v4();

//     const extension = name.split('.').pop();

//     const config = {
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_KEY,
//       },
//       region: 'ap-northeast-2',
//     };

//     const s3 = new S3Client(config);

//     const Key = `${groupName}_${uid}_${uniqId}.${extension}`;

//     const Bucket = process.env.AWS_BUCKET;
//     const Conditions = [{ acl: 'public-read' }];
//     const Fields = {
//       acl: 'public-read',
//       key: Key,
//       'Content-Type': 'application/pdf',
//     };

//     const params = {
//       Key,
//       Bucket,
//       Conditions,
//       Fields,
//       'Content-Type': 'application/pdf',
//     };

//     returnData.result = await createPresignedPost(s3, params);
//   } catch (err: any) {
//     returnData.errorMessage = err.message;
//   }

//   return returnData;
// };
