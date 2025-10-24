'use server';

import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const decompressZip = async (formData: FormData) => {
  const file = formData.get('file') as File;
  if (!file) {
    return { error: '파일이 없습니다.' };
  }

  const uploadDir = path.join(process.cwd(), 'tmp/uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const filePath = path.join(uploadDir, file.name);
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, fileBuffer);

  try {
    // ZIP 파일 압축 해제
    const extractPath = path.join(uploadDir, 'unzipped');

    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath, { recursive: true });
    }

    const zip = new AdmZip(filePath);
    zip.extractAllTo(extractPath, true);

    const extractedFiles = fs.readdirSync(extractPath).map((fileName) => ({
      name: fileName,
      path: `/uploads/unzipped/${fileName}`,
    }));

    return { message: '압축 해제 완료', files: extractedFiles };
  } catch (error: any) {
    return { message: '압축 해제 실패' };
  }
};

export default decompressZip;
