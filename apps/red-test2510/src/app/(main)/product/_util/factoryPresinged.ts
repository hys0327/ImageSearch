import { message, UploadFile } from 'antd';
import { getPDFPresignedUrl } from '@contexts/api';

export async function factoryPresignedHandler(file: UploadFile, groupName: string) {
  const { uid, lastModified, name, originFileObj } = file;
  const { result: presignedResult, errorMessage } = await getPDFPresignedUrl({
    groupName,
    uid,
    lastModified: lastModified || 0,
    name,
  });
  if (errorMessage) {
    message.error(`S3 업로드 중 문제가 발생하였습니다 : ${errorMessage}`);
    return undefined;
  }
  const formData = new FormData();

  for (const [key, value] of Object.entries(presignedResult.fields)) {
    formData.append(key, value as any);
  }
  formData.append('file', originFileObj as any);

  const res = await fetch(presignedResult.url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    message.error('S3 업로드 중 문제가 발생하였습니다.');
    return undefined;
  }

  return { orgFileName: file.name, s3FileName: presignedResult.fields.key };
}
