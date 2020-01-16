// import { extname } from 'path';
// import { existsSync, mkdirSync } from 'fs';
// import { diskStorage } from 'multer';
// import { v4 as uuid } from 'uuid';
// import { MAX_FILE_SIZE } from '@app.module/environments';

// export const multerOptions = {
//   limits: {
//     fileSize: MAX_FILE_SIZE,
//   },
//   fileFilter: (req: any, file: any, callback: Function) => {
//     if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
//       callback(new Error('Only image files are allowed!'), false);
//     }
//     callback(null, true);
//   },
//   storage: diskStorage({
//     destination: './files',
//   }),
// };
