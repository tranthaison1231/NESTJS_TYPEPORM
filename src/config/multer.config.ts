import { memoryStorage } from 'multer';
import { MAX_FILE_SIZE } from '@/environments';
import { NotAcceptableException } from '@nestjs/common';

export const multerOptions = {
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req: any, file: any, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      callback(
        new NotAcceptableException('Only image files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
  storage: memoryStorage(),
};
