import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

export const multerOptions = {
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE || 1 * 1000 * 1000,
  },
  fileFilter: (req: any, file: any, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: './files',
  }),
};
