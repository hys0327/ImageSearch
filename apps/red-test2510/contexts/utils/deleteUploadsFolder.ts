'use server';

import fs from 'fs';
import path from 'path';

/** tmp 폴더의 모든 파일 삭제 */
const deleteUploadsFolder = () => {
  const uploadDir = path.join(process.cwd(), 'tmp/uploads');

  if (fs.existsSync(uploadDir)) {
    fs.rmSync(uploadDir, { recursive: true, force: true });
  }
};

export default deleteUploadsFolder;
