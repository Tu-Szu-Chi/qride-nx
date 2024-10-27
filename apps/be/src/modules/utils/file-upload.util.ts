import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadDirectory = join(process.cwd(), 'uploads');

// 確保上傳目錄存在
if (!existsSync(uploadDirectory)) {
  mkdirSync(uploadDirectory, { recursive: true });
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only accept jpg, jpeg, png, gif!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = uuidv4();
  callback(null, `${randomName}${fileExtName}`);
};

export const imageStorage = diskStorage({
  destination: uploadDirectory,
  filename: editFileName,
});
